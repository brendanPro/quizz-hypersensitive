import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import { App } from './App';
import { Unauthorized } from './components/Unauthorized';
import { Admin } from './components/admin/Admin';
import { Login } from './components/Login';
import { BACKEND_URL, VALIDATE_PARAM, VALIDATE_USER } from './constants/backend';
import { jwtDecode } from 'jwt-decode';

const rootRoute = createRootRoute();

const baseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: async () => {
    throw redirect({ to: '/unauthorized' });
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$token',
  beforeLoad: async ({ params }) => {
    const token = params.token;
    const response = await fetch(`${BACKEND_URL}${VALIDATE_PARAM}?key=${token}`, {
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
    const credential = jwtDecode(token) as any;
    const result = await fetch(`${BACKEND_URL}${VALIDATE_USER}?user=${credential.email}`);
    if (!result.ok) throw redirect({ to: '/unauthorized' });
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

const routeTree = rootRoute.addChildren([
  baseRoute,
  indexRoute,
  adminRoute,
  unauthorizedRoute,
  loginRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
