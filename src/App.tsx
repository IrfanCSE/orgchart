import { Edge, MarkerType, Node } from 'reactflow';
import './App.css';
import Graph from './component/Graph';

const initialNodes = [
  { id: '1', label: 'Kaz software' },
  { id: '2', label: 'Wahed chowdhury', value: '65', noChild: true },
  { id: '3', label: 'Apple', value: '10' },
  { id: '4', label: 'Employee', value: '25', noChild: true },
  { id: '5', label: 'Tim cook', value: '40', noChild: true },
  { id: '6', label: 'Tesla', value: '60' },
  { id: '7', label: 'Twitter', value: '5', noChild: true },
  { id: '8', label: 'Elon musk', value: '80', noChild: true },
  { id: '9', label: 'Other', value: '15', noChild: true },
];

const initialEdges = [
  { id: '1:2', source: '1', target: '2' },
  { id: '1:3', source: '1', target: '3' },
  { id: '1:4', source: '1', target: '4' },
  { id: '3:5', source: '3', target: '5' },
  { id: '3:6', source: '3', target: '6' },
  { id: '6:7', source: '6', target: '7' },
  { id: '6:8', source: '6', target: '8' },
  { id: '6:9', source: '6', target: '9' },
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
