import { GraphComponent, GraphEditorInputMode } from 'yfiles'
import { GraphData } from './AppState';
import ReactGraphComponent from './ReactGraphComponent';

const graphData: GraphData = {
    nodesSource: [
        {
            id: 0,
            name: 'Node 0'
        },
        {
            id: 1,
            name: 'Node 1'
        },
        {
            id: 2,
            name: 'Node 2'
        }
    ],
    edgesSource: [
        {
            fromNode: 0,
            toNode: 1
        },
        {
            fromNode: 0,
            toNode: 2
        }
    ]
}

function Graph() {
    return (
        <ReactGraphComponent
            graphData={graphData}
        />
    )
}

export default Graph;