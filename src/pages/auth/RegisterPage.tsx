import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const registerSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	mobile: z.string().min(11, 'Mobile number must be at least 11 digits'),
	nid: z.string().min(10, 'NID must be at least 10 digits'),
	pin: z.string().length(5, 'PIN must be exactly 5 digits'),
	role: z.enum(['user', 'agent'], { required_error: 'Please select an account type' }),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterForm) => {
		try {
			const response = await registerUser(data);
			login(response.token, response.user);
			toast.success('Registration successful!');
			navigate('/');
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<div className="mx-auto max-w-md">
			<div className="card bg-base-200">
				<div className="card-body">
					<h2 className="card-title">Create New Account</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Full Name</span>
							</label>
							<input
								type="text"
								{...register('name')}
								className="input input-bordered"
								placeholder="Enter your full name"
							/>
							{errors.name && (
								<span className="text-sm text-error">{errors.name.message}</span>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								{...register('email')}
								className="input input-bordered"
								placeholder="Enter your email"
							/>
							{errors.email && (
								<span className="text-sm text-error">{errors.email.message}</span>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Mobile Number</span>
							</label>
							<input
								type="text"
								{...register('mobile')}
								className="input input-bordered"
								placeholder="Enter mobile number"
							/>
							{errors.mobile && (
								<span className="text-sm text-error">{errors.mobile.message}</span>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">NID Number</span>
							</label>
							<input
								type="text"
								{...register('nid')}
								className="input input-bordered"
								placeholder="Enter NID number"
							/>
							{errors.nid && (
								<span className="text-sm text-error">{errors.nid.message}</span>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Account Type</span>
							</label>
							<select {...register('role')} className="select select-bordered w-full">
								<option value="">Select account type</option>
								<option value="user">User</option>
								<option value="agent">Agent</option>
							</select>
							{errors.role && (
								<span className="text-sm text-error">{errors.role.message}</span>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">PIN (5 digits)</span>
							</label>
							<input
								type="password"
								{...register('pin')}
								className="input input-bordered"
								placeholder="Enter 5-digit PIN"
								maxLength={5}
							/>
							{errors.pin && (
								<span className="text-sm text-error">{errors.pin.message}</span>
							)}
						</div>

						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Creating Account...' : 'Create Account'}
						</button>
					</form>

					<div className="divider">OR</div>

					<Link to="/login" className="link link-hover text-center">
						Already have an account? Login
					</Link>
				</div>
			</div>
		</div>
	);
}