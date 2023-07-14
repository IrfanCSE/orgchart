import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

import './Node.css';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style = {}, markerEnd }: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, });
    console.log(data)
    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        background: '#906489',
                        padding: 5,
                        borderRadius: 50,
                        fontSize: 11,
                        fontWeight: 700,
                    }}
                    className="nodrag nopan"
                >
                    {data.value}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}