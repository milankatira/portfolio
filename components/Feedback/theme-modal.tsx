import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (theme: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    borderRadius: string;
  }) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [theme, setTheme] = useState({
    name: '',
    primaryColor: '#0000FF',
    secondaryColor: '#FFFFFF',
    borderRadius: '8px',
  });

  const handleSave = () => {
    if (!theme.name.trim()) {
      alert('Theme name is required.');
      return;
    }
    onSave(theme); // Pass theme data back to parent
    setTheme({
      name: '',
      primaryColor: '#0000FF',
      secondaryColor: '#FFFFFF',
      borderRadius: '8px',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Theme</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div>
            <Label>Theme Name</Label>
            <Input
              value={theme.name}
              onChange={(e) => setTheme({ ...theme, name: e.target.value })}
              placeholder='Enter theme name'
            />
          </div>

          <div>
            <Label>Primary Color</Label>
            <Input
              type='color'
              value={theme.primaryColor}
              onChange={(e) =>
                setTheme({ ...theme, primaryColor: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Secondary Color</Label>
            <Input
              type='color'
              value={theme.secondaryColor}
              onChange={(e) =>
                setTheme({ ...theme, secondaryColor: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Border Radius</Label>
            <RadioGroup
              value={theme.borderRadius}
              onValueChange={(value) =>
                setTheme({ ...theme, borderRadius: value })
              }
              className='grid grid-cols-4 gap-4'
            >
              {['4px', '8px', '12px', '16px'].map((radius) => (
                <Label
                  key={radius}
                  className={`flex cursor-pointer items-center justify-center rounded-md border p-4 ${
                    theme.borderRadius === radius
                      ? 'border-primary'
                      : 'border-muted'
                  }`}
                >
                  <RadioGroupItem value={radius} className='sr-only' />
                  {radius}
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Theme</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
