import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../lib/axios';

interface AuthContextType {
	user: User | null;
	login: (token: string, userData: User) => void;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			api.get('/auth/me')
				.then(res => {
					setUser(res.data.user);
				})
				.catch(() => {
					localStorage.removeItem('token');
				})
				.finally(() => setIsLoading(false));
		} else {
			setIsLoading(false);
		}
	}, []);

	const login = (token: string, userData: User) => {
		localStorage.setItem('token', token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};