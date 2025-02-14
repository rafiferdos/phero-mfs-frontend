import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow container mx-auto px-4 py-8">
				<Outlet />
			</main>
			<Footer />
			<Toaster position="top-right" />
		</div>
	);
};