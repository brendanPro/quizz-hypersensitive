import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import { App } from './App';
import { Unauthorized } from './components/Unauthorized';
import { Admin } from './components/admin/Admin';
import { Login } from './components/Login';
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
  beforeLoad: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('google_id_token') : null;
    if (!token) {
      throw redirect({ to: '/login' });
    }
  },
  component: Admin,
});

const unauthorizedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unauthorized',
  component: Unauthorized,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute, unauthorizedRoute, loginRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
