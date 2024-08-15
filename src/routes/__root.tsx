import { Toaster } from '@/components/ui/sonner';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

export const Route = createRootRoute({
  component: () => (
    <Fragment>
      <Outlet />
      <Toaster />
    </Fragment>
  ),
});
