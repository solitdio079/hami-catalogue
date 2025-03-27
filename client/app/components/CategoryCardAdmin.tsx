import { serverUrl } from "~/utils/serverUrl";
//import type { Route } from "../+types/root";
import { Link } from "react-router";
import { FaPencil, FaX } from "react-icons/fa6";

export default function CategoryCardAdmin({ item }) {
    const category = item
    return (
      <>
        {category ? (
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img src={serverUrl + '/' + category.image} alt="category image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title"> {category.name} </h2>
              <p>{category.description}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/admin/category/edit/${category._id}`}
                  className="btn bg-red"
                >
                  <FaX/> Delete
                </Link>
                <Link
                  to={`/admin/category/edit/${category._id}`}
                  className="btn btn-warning"
                >
                  <FaPencil/> Edit
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    )
}