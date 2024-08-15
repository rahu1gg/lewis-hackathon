import { useProfile } from '@/client/store/use-form.store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export function ConfirmPasswordForm() {
  const profile = useProfile((state) => state);
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <div className='max-w-[500px] mx-auto'>
      <div className='py-6'>
        <h2 className='text-2xl font-bold'>Hi {profile.name}</h2>
        <p className='text-muted-foreground text-sm mt-1.5'>
          Please read the <span>terms and conditions</span> before continuing.
        </p>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='confirm-password'>Confirm Password</Label>
          <Input
            id='confirm-password'
            placeholder='Enter your password'
            value={confirmPassword}
            onKeyDown={() => toast.info('Drag and Drop letters to the input field')}
            onChange={() => {}}
          />
        </div>
        <div>
          <Button size='lg'>Sign in</Button>
        </div>
      </form>
    </div>
  );
}
