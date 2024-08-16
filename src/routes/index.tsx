import { useProfile } from '@/client/store/use-form.store';
import { BaseConfirmPassword } from '@/components/app/base-confirm-password';
import { BaseSignUp } from '@/components/app/base-sign-up';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const tab = useProfile((state) => state.tab);
  const updateTab = useProfile((state) => state.updateTab);

  return (
    <div className='py-20'>
      <div className='flex items-center justify-center gap-1.5 max-w-[500px] mx-auto'>
        <button type='button' className='w-full h-1.5 rounded-full bg-primary hover:bg-primary/80 duration-200' onClick={() => updateTab('signup')} />
        <button type='button' className='w-full h-1.5 rounded-full bg-primary disabled:bg-muted duration-200' disabled={tab === 'signup'} />
      </div>
      {tab === 'confirm-password' ? <BaseConfirmPassword /> : <BaseSignUp />}
    </div>
  );
}
