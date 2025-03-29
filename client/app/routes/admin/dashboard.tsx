import { NavLink, Outlet } from "react-router";

export default function Dashboard() {
    return (
      <div className="flex flex-col lg:flex-row">
        <ul className="menu menu-horizontal lg:menu-vertical bg-base-200 rounded-box w-full lg:w-1/5">
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
              Products
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
              to={'/admin/category/all'}
            >
              Categories
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    )
}