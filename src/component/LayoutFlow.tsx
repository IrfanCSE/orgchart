import Dagre from 'dagre';
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
import CustomNode from '../component/CustomNode';

const edgeDefault = { type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#906489' }, style: { stroke: '#906489' } };
const nodeDefault = { className: 'default-node' };

const initialNodes: Node[] = [
  { ...nodeDefault, type: 'customNode', id: '1', position: { x: 100, y: 100 }, data: { label: 'Kaz software Kaz software' } },
  { ...nodeDefault, type: 'customNode', id: '2', position: { x: 200, y: 200 }, data: { label: 'Wahid Kaz software Kaz software', value: '65', noChild: true } },
  { ...nodeDefault, type: 'customNode', id: '3', position: { x: 300, y: 300 }, data: { label: 'Apple', value: '10' } },
  { ...nodeDefault, type: 'customNode', id: '4', position: { x: 400, y: 400 }, data: { label: 'Employee', value: '25', noChild: true } },
  { ...nodeDefault, type: 'customNode', id: '5', position: { x: 500, y: 500 }, data: { label: 'Tim', value: '40', noChild: true } },
  { ...nodeDefault, type: 'customNode', id: '6', position: { x: 500, y: 500 }, data: { label: 'Cook Kaz software Kaz software', value: '60', noChild: true } },
];

const initialEdges: Edge[] = [
  { ...edgeDefault, id: '1:2', source: '1', target: '2' },
  { ...edgeDefault, id: '1:3', source: '1', target: '3' },
  { ...edgeDefault, id: '1:4', source: '1', target: '4' },
  { ...edgeDefault, id: '3:4', source: '3', target: '5' },
  { ...edgeDefault, id: '3:5', source: '3', target: '6' },

  { ...edgeDefault, id: '10:11', source: '10', target: '11' },
];

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[], options: any) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};


const LayoutFlow = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // default vertical layout selected
  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current != null) buttonRef.current?.click();
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction: any) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

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
          <button ref={buttonRef} className='btn' onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </Panel>

        <Panel position='top-left'>
          <button className='btn' onClick={() => reset()}>Reset</button>
          <button className='btn' onClick={() => filter()}>Filter</button>
        </Panel>
        <Controls/>

      </ReactFlow>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {

  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}