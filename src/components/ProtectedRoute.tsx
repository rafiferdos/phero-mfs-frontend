import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface Props {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (allowedRoles && !allowedRoles.includes(user.role)) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};