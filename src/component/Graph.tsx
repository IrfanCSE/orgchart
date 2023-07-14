import { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
  Controls,
  Background,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './Node.css';
import CustomNode from './CustomNode';
import { GetLayoutedElements, Layout } from './layout';


const edgeDefault = { type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#906489' }, style: { stroke: '#906489' } };
const nodeDefault = { className: 'default-node', type: 'customNode' };

const Graph = ({ data }: any) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  let position = 100;
  const initialNodes = data.nodes.map((node: any) => {
    return { ...nodeDefault, id: node.id, position: { x: position += 30, y: position += 30 }, data: { label: node.label, layout: Layout.TB, ...node } }
  });

  const initialEdges = data.edges.map((edge: any) => {
    return { ...edgeDefault, id: edge.id, source: edge.source, target: edge.target }
  })

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction: any) => {

      const layouted = GetLayoutedElements(nodes, edges, { direction });

      layouted.nodes.forEach(node => node.data.layout = direction)

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      console.log(nodes)

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  const nodeTypes = useMemo(
    () => ({
      customNode: CustomNode,
    }),
    []
  );

  const filter = () => {
    const filterdNode = nodes.map(node => {
      if (node.data.value > 50)
        return { ...node, className: 'filterd-node' }

      return { ...node };
    });

    setNodes(filterdNode);
  }

  const reset = () => {
    const filterdNode = nodes.map(node => {
      return { ...node, className: 'default-node' }
    });

    setNodes(filterdNode);
  }

  // default vertical layout selected
  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) buttonRef.current?.click();
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
      >
        <Panel position="top-right">
          <button ref={buttonRef} className='btn' onClick={() => onLayout(Layout.TB)}>vertical layout</button>
          <button onClick={() => onLayout(Layout.LR)}>horizontal layout</button>
        </Panel>

        <Panel position='top-left'>
          <button className='btn' onClick={() => reset()}>Reset</button>
          <button className='btn' onClick={() => filter()}>Filter</button>
        </Panel>
        <Controls />
        <Background/>
      </ReactFlow>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ data }: any) {
  return (
    <ReactFlowProvider>
      <Graph data={data} />
    </ReactFlowProvider>
  );
}