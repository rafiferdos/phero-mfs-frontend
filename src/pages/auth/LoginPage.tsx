import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or phone number is required'),
  pin: z.string().length(5, 'PIN must be exactly 5 digits'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);
      setAuth(response.token, response.user);
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Login to Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email or Phone</span>
              </label>
              <input
                type="text"
                {...register('identifier')}
                className="input input-bordered"
                placeholder="Enter email or phone"
              />
              {errors.identifier && (
                <span className="text-sm text-error">{errors.identifier.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">PIN</span>
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
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="divider">OR</div>

          <Link to="/register" className="link link-hover text-center">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  )
}