// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user, loading } = useAuth();

//   // Wait for auth to initialize so we don't accidentally redirect
//   if (loading) return <div>Loading...</div>;

//   // If not logged in, send to login (AuthForm)
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }

//   // If roles are specified and user doesn't have the right role, send to dashboard
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // If everything is okay, render the child routes (Outlet)
//   return <Outlet />;
// };

// export default ProtectedRoute;