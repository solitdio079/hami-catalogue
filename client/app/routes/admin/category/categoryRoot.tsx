import { NavLink, Outlet } from "react-router";

export default function CategoryRoot() {
    return (
      <div className="flex flex-col w-full justify-center">
        <ul className="menu menu-horizontal bg-base-200 rounded-box w-full">
          <li>
             <NavLink to={'/admin/category/create'}>Create category</NavLink>
          </li>
          <li>
            <NavLink to={'/admin/category/all'}>All Categories</NavLink>
          </li>
        
            </ul>
            
            <Outlet/>
      </div>
    )
}