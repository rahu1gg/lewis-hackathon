import { useProfile } from '@/client/store/use-form.store';
import { BaseConfirmPassword } from '@/components/app/base-confirm-password';
import { BaseSignIn } from '@/components/app/base-sign-in';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const tab = useProfile((state) => state.tab);

  if (tab === 'signup') return <BaseSignIn />;

  return <BaseConfirmPassword />;
}
