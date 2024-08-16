import { useProfile } from '@/client/store/use-form.store';
import { ConfirmPasswordForm } from '@/components/app/confirm-password-form';
import { PASSWORD_CHARACTERS } from '@/constants/confirm-password-characters';
import { generateRandomCoordinates } from '@/lib/utils/generate-random-coordinates';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import React from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const tab = useProfile((state) => state.tab);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  // if (tab === 'signup') {
  //   return (
  //     <div className='flex items-stretch justify-start min-h-screen py-20'>
  //       <div className='max-w-[500px] mx-auto w-full'>
  //         <div className='py-6'>
  //           <h2 className='text-2xl font-bold'>Signup</h2>
  //           <p className='text-muted-foreground text-sm mt-1.5'>Enter your details to create new account.</p>
  //         </div>
  //         <SignInForm />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div ref={constraintsRef} className='flex items-stretch justify-start min-h-screen'>
      <ConfirmPasswordForm />
      {PASSWORD_CHARACTERS.map((character) => {
        const [dragging, setDragging] = React.useState(false);
        const coordinatesRef = React.useRef(generateRandomCoordinates());
        const { x, y } = coordinatesRef.current;

        return (
          <motion.div
            key={character.id}
            initial={{ x, y }}
            className='w-max pointer-events-auto absolute p-1 left-0 top-0 flex items-center justify-center group'
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
              <character.comp className='size-6' />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
