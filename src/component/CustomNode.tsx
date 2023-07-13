import { Handle, Position } from 'reactflow';
import './Node.css'

export default function CustomNode({ data }: any) {
    console.log(data)
    // generate custome label
    const label = () => {
        if (data.label.length <= 20)
            return data.label;

        return data.label.split(' ').slice(0, 3).join(' ') + ' . . .';
    }

    return (
        <>
            {data.value && <Handle type="target" position={Position.Top} isConnectable={false} />}
            <div className='node'>
                <span>{label()} {!!data.value ? `[${data.value}%]` : ''}</span>
            </div>
            {!data.noChild && <Handle type="source" position={Position.Bottom} isConnectable={false} />}
        </>
    );
}