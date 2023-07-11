import { Handle, Position } from 'reactflow';
import './Node.css'

export default function CustomNode({ data }: any) {
    const handleTarget = () => data.value && <Handle type="target" position={Position.Top} isConnectable={false} />
    const handleSource = () => !data.noChild && <Handle type="source" position={Position.Bottom} isConnectable={false} />

    // generate custome label
    const label = () => {
        if (data.label.length <= 20)
            return data.label;

        return data.label.split(' ').slice(0, 3).join(' ') + ' . . .';
    }

    return (
        <>
            {handleTarget()}
            <div className='node'>
                <span>{label()} {!!data.value ? `[${data.value}%]` : ''}</span>
            </div>
            {handleSource()}
        </>
    );
}