import { ConfirmPasswordForm } from '@/components/app/confirm-password-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-in')({
  component: () => (
    <div className='flex items-stretch justify-start min-h-screen'>
      <div className='w-full py-20'>
        <ConfirmPasswordForm />
      </div>
      <div className='p-2 w-full'>
        <div className='bg-muted rounded-md h-full'>
          <p>Drag and Drop letters</p>
        </div>
      </div>
    </div>
  ),
});
