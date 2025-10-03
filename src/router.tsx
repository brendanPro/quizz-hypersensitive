import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import { App } from './App';
import { Unauthorized } from './components/Unauthorized';
import { Admin } from './components/admin/Admin';
import { BACKEND_URL, VALIDATE_PARAM } from './constants/backend';

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: async () => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const response = await fetch(`${BACKEND_URL}${VALIDATE_PARAM}${search}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw redirect({ to: '/unauthorized' });
    }
  },
  component: App,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: Admin,
});

const unauthorizedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unauthorized',
  component: Unauthorized,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute, unauthorizedRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
