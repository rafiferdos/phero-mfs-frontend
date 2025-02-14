import { api } from '../lib/axios';
import { AuthResponse, User } from '../types';

interface LoginData {
	identifier: string;
	pin: string;
}

interface RegisterData {
	name: string;
	email: string;
	mobile: string;
	nid: string;
	pin: string;
	role: 'user' | 'agent';
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>('/auth/login', data);
	return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>('/auth/register', data);
	return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
	const response = await api.get<{ user: User }>('/auth/me');
	return response.data.user;
};