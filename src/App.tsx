import { Edge, MarkerType, Node } from 'reactflow';
import './App.css';
import Graph from './component/Graph';

const initialNodes = [
  { id: '1', label: 'Kaz software Kaz software' },
  { id: '2', label: 'Wahid Kaz software Kaz software', value: '65', noChild: true },
  { id: '3', label: 'Apple', value: '10' },
  { id: '4', label: 'Employee', value: '25', noChild: true },
  { id: '5', label: 'Tim', value: '40', noChild: true },
  { id: '6', label: 'Cook Kaz software Kaz software', value: '60', noChild: true },
];

const initialEdges = [
  { id: '1:2', source: '1', target: '2' },
  { id: '1:3', source: '1', target: '3' },
  { id: '1:4', source: '1', target: '4' },
  { id: '3:5', source: '3', target: '5' },
  { id: '3:6', source: '3', target: '6' },
];

const response = { nodes: initialNodes, edges: initialEdges }

function App() {
  return (
    <div >
      <header>
        <Graph data={response} />
      </header>
    </div>
  );
}

export default App;
