import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  MarkerType,
  SelectionMode,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: '1' }, style:{background:'red'} },
  { id: '2', position: { x: 200, y: 200 }, data: { label: '2' } },
  { id: '3', position: { x: 300, y: 300 }, data: { label: '3' } },
  { id: '4', position: { x: 400, y: 400 }, data: { label: '4' } },
  { id: '5', position: { x: 500, y: 500 }, data: { label: '5' } },

  { id: '10', position: { x: 600, y: 100 }, data: { label: '10' } },
  { id: '11', position: { x: 700, y: 200 }, data: { label: '11' } },
];

const edgeDefault = { type: 'step', markerEnd: { type: MarkerType.ArrowClosed } };

const initialEdges: Edge[] = [
  { ...edgeDefault, id: '1:2', source: '1', target: '2' },
  { ...edgeDefault, id: '1:3', source: '1', target: '3' },
  { ...edgeDefault, id: '3:4', source: '3', target: '4' },
  { ...edgeDefault, id: '3:5', source: '3', target: '5' },
  
  { ...edgeDefault, id: '10:11', source: '10', target: '11' },
];

const panOnDrag = [1, 2];


function ReactFlowSample() {
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
        
        fitView
        
        // panOnScroll
        // selectionOnDrag
        // panOnDrag={panOnDrag}
        // selectionMode={SelectionMode.Partial}
      >
        {/* <MiniMap /> */}
        <Controls />
        <Background />
      </ReactFlow>

    </div>
  );
}

export default ReactFlowSample;