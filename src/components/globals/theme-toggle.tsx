import { useTheme } from '@/client/providers/theme-provider';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { generateRandomCoordinates } from '@/lib/utils/generate-random-coordinates';
import { motion } from 'framer-motion';
import { GripVertical, Moon, Sun } from 'lucide-react';
import React from 'react';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const coordinatesRef = React.useRef(generateRandomCoordinates());
  const { x, y } = coordinatesRef.current;

  return (
    <motion.div initial={{ x, y }} className='absolute p-1 left-0 top-0 flex items-center justify-center gap-1' drag>
      <GripVertical className='text-muted-foreground hover:cursor-grab group-data-[dragging=true]:cursor-grabbing' size={16} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
