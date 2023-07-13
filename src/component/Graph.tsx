import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Edge,
  MarkerType,
  Background,
  Controls,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './Node.css';
import CustomNode from './CustomNode';
import { GetLayoutedElements } from './layout';


const edgeDefault = { type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#906489' }, style: { stroke: '#906489' } };
const nodeDefault = { className: 'default-node', type: 'customNode' };

const Graph = ({ data }: any) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const initialNodes = data.nodes.map((node: any) => {
    const treePosition_x = Math.floor(Math.random() * 501);
    const treePosition_y = Math.floor(Math.random() * 501);
    return { ...nodeDefault, id: node.id, position: { x: treePosition_x, y: treePosition_y }, data: { label: node.label, ...node } }
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

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

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
      if (buttonRef.current != null) buttonRef.current?.click();
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
        // fitView
        nodeTypes={nodeTypes}
      >
        <Panel position="top-right">
          <button ref={buttonRef} className='btn' onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </Panel>

        <Panel position='top-left'>
          <button className='btn' onClick={() => reset()}>Reset</button>
          <button className='btn' onClick={() => filter()}>Filter</button>
        </Panel>
        <Controls />

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