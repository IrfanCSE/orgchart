import { Handle, Position } from 'reactflow';
import './Node.css'
import { Layout } from './layout';

export default function CustomNode({ data }: any) {
    // generate custome label
    const label = () => {
        if (data.label.length <= 20)
            return data.label;

        return data.label.split(' ').slice(0, 3).join(' ') + ' . . .';
    }

    return (
        <>
            {data.label && <Handle type="target" position={data.layout === Layout.TB ? Position.Top : Position.Left} isConnectable={false} />}
            <div className='node'>
                <span>{label()} {!!data.value ? `[${data.value}%]` : ''}</span>
            </div>
            {!data.noChild && <Handle type="source" position={data.layout === Layout.TB ? Position.Bottom : Position.Right} isConnectable={false} />}
        </>
    );
}