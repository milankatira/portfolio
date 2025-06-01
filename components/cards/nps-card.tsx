import { Card } from '../ui/card';

export const NpsCard = () => {
  return (
    <Card className='p-4'>
      <div className='space-y-4'>
        <div className='text-center'>
          <span className='text-4xl font-bold'>80</span>
          <span className='text-sm text-muted-foreground'>/100</span>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>Promoters (9-10)</span>
            <div className='w-32 bg-muted rounded-full h-2'>
              <div
                className='bg-green-500 h-2 rounded-full'
                style={{ width: '70%' }}
              />
            </div>
            <span className='text-sm'>70%</span>
          </div>

          <div className='flex items-center justify-between text-sm'>
            <span>Passives (7-8)</span>
            <div className='w-32 bg-muted rounded-full h-2'>
              <div
                className='bg-yellow-500 h-2 rounded-full'
                style={{ width: '20%' }}
              />
            </div>
            <span className='text-sm'>20%</span>
          </div>

          <div className='flex items-center justify-between text-sm'>
            <span>Detractors (0-6)</span>
            <div className='w-32 bg-muted rounded-full h-2'>
              <div
                className='bg-red-500 h-2 rounded-full'
                style={{ width: '10%' }}
              />
            </div>
            <span className='text-sm'>10%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
