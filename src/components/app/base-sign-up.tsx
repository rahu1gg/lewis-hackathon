import { SignUpForm } from '@/components/app/sign-up-form';
import { ModeToggle } from '@/components/globals/theme-toggle';

export function BaseSignUp() {
  return (
    <div className='flex items-stretch justify-start min-h-screen overflow-hidden'>
      <ModeToggle />
      <div className='max-w-[500px] mx-auto w-full'>
        <div className='py-6'>
          <h2 className='text-2xl font-bold'>Signup</h2>
          <p className='text-muted-foreground text-sm mt-1.5'>Enter your details to create new account.</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
