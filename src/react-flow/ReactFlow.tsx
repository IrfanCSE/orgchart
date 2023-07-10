import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: '1' } },
  { id: '2', position: { x: 200, y: 200 }, data: { label: '2' } },
  { id: '3', position: { x: 300, y: 300 }, data: { label: '3' } },
  { id: '4', position: { x: 400, y: 400 }, data: { label: '4' } },
];

const initialEdges = [
  { id: '1:2', source: '1', target: '2', type: 'step' },
  { id: '1:3', source: '1', target: '3', type: 'step' },
  { id: '3:4', source: '3', target: '4', type: 'step' }
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ height: 800 }}>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      >
        {/* <MiniMap /> */}
        <Controls />
        <Background />
      </ReactFlow>

    </div>
  );
}

export default Flow;