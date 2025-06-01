'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Check, Moon, Sun, Monitor } from 'lucide-react';

interface ThemeOption {
  label: string;
  value: 'light' | 'dark' | 'system';
  icon: React.ReactNode;
}

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string>('system');

  const themes: ThemeOption[] = [
    { label: 'Light', value: 'light', icon: <Sun className='h-6 w-6' /> },
    { label: 'Dark', value: 'dark', icon: <Moon className='h-6 w-6' /> },
    { label: 'System', value: 'system', icon: <Monitor className='h-6 w-6' /> },
  ];

  useEffect(() => {
    setSelectedTheme(theme || 'system');
  }, [theme]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setSelectedTheme(value);
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-muted-foreground'>
        Appearance
      </h3>
      <div className='grid grid-cols-3 gap-4'>
        {themes.map((item) => (
          <button
            key={item.value}
            onClick={() => handleThemeChange(item.value)}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all ${
              selectedTheme === item.value
                ? 'border-primary ring-1 ring-primary'
                : 'border-muted'
            } hover:bg-muted`}
          >
            <div className='relative flex items-center justify-center w-16 h-12 rounded-md bg-muted-foreground/10'>
              {item.icon}
              {selectedTheme === item.value && (
                <Check className='absolute bottom-1 right-1 h-4 w-4 text-primary  rounded-full p-0.5' />
              )}
            </div>
            <span className='text-sm font-medium'>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSettings;
