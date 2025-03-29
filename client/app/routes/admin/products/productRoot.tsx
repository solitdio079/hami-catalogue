import { NavLink, Outlet } from 'react-router'

export default function ProductRoot() {
  return (
    <div className="flex flex-col w-full justify-center">
      <ul className="menu menu-horizontal bg-base-200 rounded-box w-full">
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isActive
                ? 'bg-primary text-white'
                : isPending
                ? 'bg-secondary text-white'
                : ''
            }
            to={'/admin/products/create'}
          >
            Create product
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
            to={'/admin/products/all'}
          >
            All Products
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  )
}
