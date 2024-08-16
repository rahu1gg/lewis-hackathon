import { ConfirmPasswordForm } from '@/components/app/confirm-password-form';
import { PASSWORD_CHARACTERS } from '@/constants/confirm-password-characters';
import { generateRandomCoordinates } from '@/lib/utils/generate-random-coordinates';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import React from 'react';
import { ModeToggle } from '../globals/theme-toggle';

export function BaseConfirmPassword() {
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={constraintsRef} className='flex items-stretch justify-start min-h-screen overflow-hidden'>
      <ModeToggle />
      <ConfirmPasswordForm />
      {PASSWORD_CHARACTERS.map((character) => {
        const [dragging, setDragging] = React.useState(false);
        const coordinatesRef = React.useRef(generateRandomCoordinates());
        const { x, y } = coordinatesRef.current;

        return (
          <motion.div
            key={character.id}
            initial={{ x, y }}
            className='w-max pointer-events-auto absolute p-2 left-0 top-0 flex items-center justify-center group'
            data-dragging={dragging}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            dragConstraints={constraintsRef}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            drag
          >
            <GripVertical className='text-muted-foreground hover:cursor-grab group-data-[dragging=true]:cursor-grabbing' size={16} />
            <motion.div
              className='bg-muted/80 rounded-md p-1 hover:cursor-pointer'
              onDragStart={(e) => {
                // @ts-ignore
                e.dataTransfer.setData('cardId', character.id);
              }}
              draggable='true'
            >
              <character.comp className='size-6 text-foreground' />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
