import { Handle, Position } from 'reactflow';
import './Node.css'

export default function CustomNode({ data }: any) {
    console.log(data)

    const handleTarget = () => data.value && <Handle type="target" position={Position.Top} isConnectable={false} />
    const handleSource = () => !data.noChild && <Handle type="source" position={Position.Bottom} id="source" isConnectable={false} />

    // generate custome label
    const label = () => {
        if (data.label.length <= 20)
            return data.label;

        let text: string = data.label;

        const word = text.split(' ');

        return word.slice(0, 3).join(' ') + ' . . .';
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