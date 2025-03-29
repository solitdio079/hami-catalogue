import { serverUrl } from "~/utils/serverUrl";
//import type { Route } from "../+types/root";
import { Link, Form } from "react-router";
import { FaPencil, FaX } from "react-icons/fa6";

export default function CategoryCardAdmin({ item }) {
    const category = item
    return (
      <>
        {category ? (
          <div className="card bg-base-100 w-96 shadow-sm m-5">
            <figure>
              <img
                src={serverUrl + '/' + category.image}
                alt="category image"
              />
            </figure>
            <div className="card-body text-neutral">
              <h2 className="card-title"> {category.name} </h2>
              <p>{category.description}</p>
              <div className="card-actions justify-end">
                <Form method="post" action={`/admin/category/delete/${category._id}`}>
                  <button className="btn btn-error">
                    <FaX /> Delete
                  </button>
                </Form>
                <Link
                  to={`/admin/category/edit/${category._id}`}
                  className="btn btn-warning"
                >
                  <FaPencil /> Edit
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