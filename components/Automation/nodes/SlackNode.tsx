import { Handle, Position } from 'reactflow';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { SlackIcon } from '@/components/icons/SlackIcon';

export default function SlackNode() {
  return (
    <>
      {/* Input Handle */}
      <Handle
        type='target'
        position={Position.Top}
        style={{ background: '#555' }}
      />

      <Card>
        <div className='flex flex-row gap-4 items-center border-1 p-4 '>
          <div>
            <SlackIcon />
          </div>

          <div>
            <CardTitle>Slack</CardTitle>
            <CardDescription>Send notifications to Slack.</CardDescription>
          </div>
        </div>
      </Card>

      {/* Output Handle */}
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
    </>
  );
}
