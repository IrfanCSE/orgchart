import React, { useState } from 'react';

const getNodeStyle = (nodeData: any) => {
    if (nodeData.value > 10) {
        return { fill: '#CF2979', stroke: '#95275B' };
    } else if (nodeData.value <= 5) {
        return { fill: '#FFF2B3', stroke: '#FFF2B3' };
    } else {
        return { fill: '#CF2979', stroke: '#95275B' };
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
    // const [isHovered, setIsHovered] = useState(true);

    // const handleMouseEnter = () => {
    //     setIsHovered(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsHovered(false);
    // };

    return (
        <g 
        // onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <rect x={-15} y={-15} width={30} height={30} rx={5} ry={5}  {...nodeStyle.shapeProps} style={style} />
            {/* {isHovered && <text x={-15} y={20}>{value}</text>} */}
        </g>
    );
}

export default RenderCustomNodeElement;