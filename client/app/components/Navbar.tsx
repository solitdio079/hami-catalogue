import { Link } from 'react-router'
import logo from './logo.png'
import {FaBars} from 'react-icons/fa6'
export default function Navbar() {
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
                  <a>Accueil</a>
                </li>
                <li>
                  <a>Produits</a>
                  <ul className="p-2">
                    <li>
                      <a>Porte</a>
                    </li>
                    <li>
                      <a>Fournitures</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to={'/admin'}>Admin</Link>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">
              {' '}
              <img src={logo} width={80} />{' '}
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Accueil</a>
              </li>
              <li>
                <details>
                  <summary>Produits</summary>
                  <ul className="p-2">
                    <li>
                      <a>Portes</a>
                    </li>
                    <li>
                      <a>Fauteuils</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link to={'/admin'}>Admin</Link>
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