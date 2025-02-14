import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className='bg-base-100 shadow-md'>
      <div className='navbar container mx-auto'>
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost text-xl'>
            MFS App
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            {!user ? (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <button onClick={logout} className="btn btn-ghost">
                    Logout
                  </button>
                </li>
                <li>
                  <span className="badge badge-primary">
                    Balance: ৳{user.balance.toFixed(2)}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
