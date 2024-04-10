import { Outlet, Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Menu } from './pages/Menu';
import { Orders } from './components/Orders';
import { Checkout } from './pages/Checkout';

// Public Route Component
function PublicRoute() {
  return (
    <div>
      <h1>Public Route</h1>
      <Outlet />
    </div>
  );
}

// Private Route Component
function PrivateRoute() {
  const isAuthenticated = true; // Check user authentication status
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Private Route</h1>
      <Outlet />
    </div>
  );
}


export default function InternalPages() {

  const routes = useRoutes([
    {
      path: '/',
      element: <PublicRoute />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/products/:id', element: <Products /> },
        { path: '/login', element: <Login /> },
        { path: '/checkout', element: <Checkout />}
      ],
    },
    {
      path: '/',
      element:<PrivateRoute /> ,
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/menu', element: <Menu />},
        { path: '/orders', element: <Orders />}
      ],
    },
  ]);

  return routes;
}
