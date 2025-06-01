import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ActionPanelProps {
  actions: { type: string; label: string; description: string }[];
}

export default function ActionPanel({ actions }: ActionPanelProps) {
  const onDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='p-4 space-y-4'>
      {actions.map((action) => (
        <Card
          key={action.type}
          draggable
          onDragStart={(e) => onDragStart(e, action.type)}
          className='cursor-pointer hover:bg-gray-700 transition'
        >
          <CardHeader>
            <CardTitle>{action.label}</CardTitle>
          </CardHeader>
          <CardContent className='text-sm text-muted-foreground'>
            {action.description}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
