import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NodePanel() {
  return (
    <div className='p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Node Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type='text'
            placeholder='Node Label'
            className='w-full p-2 mt-2 rounded bg-gray-700 text-white'
          />
          <Button className='w-full mt-4'>Apply Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
