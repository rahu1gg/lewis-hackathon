import { useProfile } from '@/client/store/use-form.store';
import { BaseConfirmPassword } from '@/components/app/base-confirm-password';
import { BaseSignUp } from '@/components/app/base-sign-up';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';

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
        <button type='button' className={`w-full h-1.5 rounded-full ${tab === 'signup' ? 'bg-muted' : 'bg-primary'}`} disabled={tab === 'signup'} />
      </div>
      <AnimatePresence>
        {tab === 'signup' && (
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3, type: 'tween' } }}
            exit={{ opacity: 0, translateY: 50, transition: { duration: 0.3, type: 'tween' } }}
          >
            <BaseSignUp />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {tab === 'confirm-password' && (
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3, type: 'tween', delay: 0.3 } }}
            exit={{ opacity: 0, translateY: 50, transition: { duration: 0.3, type: 'tween' } }}
          >
            <BaseConfirmPassword />
          </motion.div>
        )}
      </AnimatePresence>
      {/* {tab === 'confirm-password' ? <BaseConfirmPassword /> : <BaseSignUp />} */}
    </div>
  );
}
