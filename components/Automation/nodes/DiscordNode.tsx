import { Handle, Position } from 'reactflow';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { DiscordIcon } from '@/components/icons/DiscordIcon';

export default function DiscordNode() {
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
            <DiscordIcon />
          </div>

          <div>
            <CardTitle>Discord</CardTitle>
            <CardDescription>Post messages to Discord servers.</CardDescription>
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
