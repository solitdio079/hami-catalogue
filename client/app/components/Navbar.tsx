import { Link, NavLink } from 'react-router'
import logo from './logo.png'
import { FaBars } from 'react-icons/fa6'
import { useContext } from 'react'
import { UserContext } from '~/utils/context'
export default function Navbar() {
  const user = useContext(UserContext)
    return (
      <>
        <div className="navbar shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <FaBars />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-secondary text-white'
                        : ''
                    }
                    to={'/'}
                  >
                    Accueil
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-secondary text-white'
                        : ''
                    }
                    to={'/categoriesList'}
                  >
                    Produits
                  </NavLink>
                </li>
                <li>
                  <li>
                    {user ? (
                      <NavLink
                        className={({ isActive, isPending }) =>
                          isActive
                            ? 'bg-primary text-white'
                            : isPending
                            ? 'bg-secondary text-white'
                            : ''
                        }
                        to={'/logout'}
                      >
                        Logout
                      </NavLink>
                    ) : (
                      ''
                    )}
                  </li>
                </li>
                <li>
                  {user ? (
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? 'bg-primary text-white'
                          : isPending
                          ? 'bg-secondary text-white'
                          : ''
                      }
                      to={'/admin'}
                    >
                      Admin
                    </NavLink>
                  ) : (
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? 'bg-primary text-white'
                          : isPending
                          ? 'bg-secondary text-white'
                          : ''
                      }
                      to={'/login'}
                    >
                      Login
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
            <Link to={'/'} className="btn btn-ghost text-xl">
              {' '}
              <img src={logo} width={80} />{' '}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'bg-primary text-white'
                      : isPending
                      ? 'bg-secondary text-white'
                      : ''
                  }
                  to={'/'}
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'bg-primary text-white'
                      : isPending
                      ? 'bg-secondary text-white'
                      : ''
                  }
                  to={'/categoriesList'}
                >
                  Produits
                </NavLink>
              </li>
              <li>
                {user ? (
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-secondary text-white'
                        : ''
                    }
                    to={'/logout'}
                  >
                    Logout
                  </NavLink>
                ) : (
                  ''
                )}
              </li>
              <li>
                {user ? (
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-secondary text-white'
                        : ''
                    }
                    to={'/admin'}
                  >
                    Admin
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-secondary text-white'
                        : ''
                    }
                    to={'/login'}
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn">Button</a>
          </div>
        </div>
      </>
    )
}