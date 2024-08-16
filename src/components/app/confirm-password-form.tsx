import { useProfile } from '@/client/store/use-form.store';
import { Label } from '@/components/ui/label';
import React from 'react';
import { toast } from 'sonner';
import { PASSWORD_CHARACTERS } from '../../constants/confirm-password-characters';
import { ShowPasswordIcon } from '../globals/show-password-icon';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function ConfirmPasswordForm() {
  const profile = useProfile((state) => state);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [active, setActive] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  function handleDragEnd(e: React.DragEvent) {
    e.preventDefault();

    const id = e.dataTransfer.getData('cardId');
    const letter = PASSWORD_CHARACTERS.find((c) => c.id.toString() === id);

    setActive(false);
    if (!letter) return;

    setConfirmPassword((prev) => prev + letter.character);
    setShowConfirmPassword(false);
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

    if (confirmPassword === profile.password) {
      toast.warning('User already exists');
      return;
    }

    toast.error('Password and Confirm password should match');
  }

  return (
    <div className='max-w-[500px] mx-auto w-full py-20'>
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
              className='data-[drag=true]:bg-white data-[drag=true]:placeholder:text-background data-[drag=true]:text-background duration-300'
              value={confirmPassword}
              data-drag={active}
              type={showConfirmPassword ? 'text' : 'password'}
              onKeyDown={() => toast.info('Drag and Drop characters to the input field')}
              onChange={() => {}}
              autoComplete='off'
            />
            <ShowPasswordIcon showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />
          </div>
        </div>
        <div>
          <Button size='lg' type='submit'>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
