import { useProfile } from '@/client/store/use-form.store';
import { ConfirmPasswordForm } from '@/components/app/confirm-password-form';
import { PASSWORD_CHARACTERS } from '@/components/app/password';
import { SignInForm } from '@/components/app/sign-in-form';
import { generateRandomCoordinates } from '@/lib/utils/generate-random-coordinates';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import React from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const tab = useProfile((state) => state.tab);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  if (tab === 'signup') {
    return (
      <div className='flex items-stretch justify-start min-h-screen py-20'>
        <div className='max-w-[500px] mx-auto w-full'>
          <div className='py-6'>
            <h2 className='text-2xl font-bold'>Signup</h2>
            <p className='text-muted-foreground text-sm mt-1.5'>Enter your details to create new account.</p>
          </div>
          <SignInForm />
        </div>
      </div>
    );
  }

  return (
    <div ref={constraintsRef} className='flex items-stretch justify-start min-h-screen'>
      <ConfirmPasswordForm />
      {PASSWORD_CHARACTERS.map((character) => {
        const { x, y } = generateRandomCoordinates();

        return (
          <motion.div
            key={character.id}
            initial={{ x, y }}
            data-id={character.id}
            className='bg-muted/80 rounded-md w-max pointer-events-auto p-2 absolute left-0 top-0'
            whileTap={{ scale: 0.8 }}
            dragConstraints={constraintsRef}
            onDragStart={(e) => {
              // @ts-ignore
              e.dataTransfer.setData('cardId', character.id);
            }}
            draggable='true'
          >
            <character.comp className='size-8' />
          </motion.div>
        );
      })}
    </div>
  );
}
