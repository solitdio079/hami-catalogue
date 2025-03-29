import { NavLink, Outlet } from "react-router";

export default function Dashboard() {
    return (
      <div className="flex flex-col lg:flex-row">
        <ul className="menu menu-horizontal lg:menu-vertical bg-base-200 rounded-box w-full lg:w-1/5">
          <li>
            <a>Profile</a>
          </li>
          <li>
            <NavLink to={"/admin/products/create"}>Products</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/category/all"}>Categories</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    )
}