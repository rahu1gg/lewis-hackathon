import { useProfile } from '@/client/store/use-form.store';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ShowPasswordIcon } from '../globals/show-password-icon';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long' })
    .max(50, { message: 'Username must be at most 50 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/^[a-zA-Z0-9]+$/, 'Password can only contain letters and numbers'),
});

export function SignUpForm() {
  const [loading, setLoading] = React.useState(false);
  const username = useProfile((state) => state.name);
  const password = useProfile((state) => state.password);
  const updateName = useProfile((state) => state.updateName);
  const updatePassword = useProfile((state) => state.updatePassword);
  const updateTab = useProfile((state) => state.updateTab);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
      password,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 750));

    updateName(values.username);
    updatePassword(values.password);
    updateTab('confirm-password');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Enter your username' {...field} autoComplete='off' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input placeholder='Enter your password' type={showPassword ? 'text' : 'password'} {...field} autoComplete='off' />
                </FormControl>
                <ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' size='lg' disabled={loading}>
          Continue
        </Button>
      </form>
    </Form>
  );
}
