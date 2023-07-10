const filterd_node = { fill: '#FFF2B3', stroke: '#FFF2B3' };
const default_node = { fill: '#CF2979', stroke: '#95275B' };

const getNodeStyle = (nodeData: any) => {
    if (nodeData.value > 10) {
        return default_node;
    } else if (nodeData.value <= 5) {
        return filterd_node;
    } else {
        return default_node;
    }
};

const nodeStyle = {
    shape: 'rect',
    shapeProps: {
        r: 10,
        fill: '#CF2979', // default color
        stroke: '#95275B',
        strokeWidth: 2
    }
};

function RenderCustomNodeElement(nodeDatum: any) {
    const { value } = nodeDatum;
    const style = getNodeStyle(nodeDatum);

    return (
        <g>
            <rect x={-15} y={-15} width={30} height={30} rx={5} ry={5}  {...nodeStyle.shapeProps} style={style} />
        </g>
    );
}

export default RenderCustomNodeElement;