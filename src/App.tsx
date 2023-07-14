import { Edge, MarkerType, Node } from 'reactflow';
import './App.css';
import Graph from './component/Graph';

// const initialNodes = [
//   { id: '1', label: 'Kaz software' },
//   { id: '2', label: 'Wahed chowdhury', value: '65', noChild: true },
//   { id: '3', label: 'Apple', value: '10' },
//   { id: '4', label: 'Employee', value: '25', noChild: true },
//   { id: '5', label: 'Tim cook', value: '40' },
//   { id: '6', label: 'Tesla', value: '60' },
//   { id: '7', label: 'Twitter', value: '5', noChild: true },
//   { id: '8', label: 'Elon musk', value: '80' },
//   { id: '9', label: 'Other', value: '15', noChild: true },
//   { id: '10', label: 'All', value: '15' },
// ];

const initialNodes = [
  { id: '1', label: 'Kaz software' },
  { id: '2', label: 'Wahed chowdhury', noChild: true },
  { id: '3', label: 'Apple' },
  { id: '4', label: 'Employee', noChild: true },
  { id: '5', label: 'Tim cook' },
  { id: '6', label: 'Tesla', },
  { id: '7', label: 'Twitter', noChild: true },
  { id: '8', label: 'Elon musk' },
  { id: '9', label: 'Other', noChild: true },
  { id: '10', label: 'All' },
];

const initialEdges = [
  { id: '1:2', source: '1', target: '2', data: { value: '60', } },
  { id: '1:3', source: '1', target: '3', data: { value: '30', }, },
  { id: '1:4', source: '1', target: '4', data: { value: '10', }, },
  { id: '3:5', source: '3', target: '5', data: { value: '80', }, },
  { id: '3:6', source: '3', target: '6', data: { value: '20', }, },
  { id: '6:7', source: '6', target: '7', data: { value: '25', }, },
  { id: '6:8', source: '6', target: '8', data: { value: '70', }, },
  { id: '6:9', source: '6', target: '9', data: { value: '5', }, },
  { id: '8:10', source: '8', target: '10', data: { value: '100', }, },
  { id: '9:10', source: '10', target: '9', data: { value: '100', }, },
  { id: '5:9', source: '5', target: '9', data: { value: '5', }, },
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
