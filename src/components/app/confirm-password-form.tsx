import { useCharacterHelpers } from '@/client/store/use-character-helpers.store';
import { useProfile } from '@/client/store/use-form.store';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import React from 'react';
import { toast } from 'sonner';
import { PASSWORD_CHARACTERS } from '../../constants/confirm-password-characters';
import { ShowPasswordIcon } from '../globals/show-password-icon';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function ConfirmPasswordForm() {
  const profile = useProfile((state) => state);
  const [active, setActive] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showFunctionalDys, setShowFunctionalDys] = React.useState(true);
  const isCapsLockOn = useCharacterHelpers((state) => state.isCapsLockOn);
  const updateCapsLock = useCharacterHelpers((state) => state.updateIsCapsLockOn);

  function handleDragEnd(e: React.DragEvent) {
    e.preventDefault();

    const id = e.dataTransfer.getData('cardId');

    const letter = PASSWORD_CHARACTERS.find((c) => c.id.toString() === id);
    if (!letter) return;

    setActive(false);

    switch (letter.character) {
      case 'backspace':
        setConfirmPassword((prev) => prev.slice(0, -1));
        break;
      case 'capslk':
        toast.info(`Caps Lock is ${isCapsLockOn ? 'on 🔒' : 'off 🔓'}`, { closeButton: true });
        updateCapsLock();
        break;
      case 'signin':
        toast.warning('Username already exists 😭', {
          closeButton: true,
        });
        break;

      default:
        if (showFunctionalDys) {
          toast.info('Functionally Dysfunctional 🥲', {
            description: 'Due to nature of keyboard, the characters are placed in reverse order',
            closeButton: true,
            onDismiss: () => showFunctionalDys && setShowFunctionalDys(false),
          });
        }
        setConfirmPassword((prev) => prev + letter.character);
        setShowConfirmPassword(false);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setActive(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (confirmPassword !== profile.password) {
      toast.error('Password and Confirm password should match 🤔', { closeButton: true });
      return;
    }

    toast.info('Drag and drop the Sign in btn on to input field 👉', { closeButton: true });
  }

  return (
    <div className='max-w-[500px] mx-auto w-full'>
      <div className='py-6'>
        <h2 className='text-2xl font-bold'>Hi {profile.name}</h2>
        <p className='text-muted-foreground text-sm mt-1.5'>Confirm your password to continue.</p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='confirm-password'>Confirm Password</Label>
          <div className='relative' data-drag={active} onDrop={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
            <Input
              id='confirm-password'
              placeholder='Enter your password'
              className='dark:data-[drag=true]:bg-neutral-700 data-[drag=true]:bg-neutral-200 duration-300 font-semibold'
              value={confirmPassword}
              data-drag={active}
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={() => {}}
              autoComplete='off'
              onFocus={(e) => {
                e.target.blur();
                toast.info('Drag and Drop characters to the input field 👉', {
                  closeButton: true,
                });
              }}
            />
            <ShowPasswordIcon showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />
          </div>
        </div>
        <div>
          {profile.password === confirmPassword ? (
            <motion.div
              className='w-max'
              onDragStart={(e) => {
                // @ts-ignore
                e.dataTransfer.setData('cardId', '203');
              }}
              draggable='true'
            >
              <Button size='lg' type='submit'>
                Sign in
              </Button>
            </motion.div>
          ) : (
            <Button size='lg' type='submit'>
              Sign in
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
