import { FaEye } from "react-icons/fa6"
import { Link } from "react-router"
import { serverUrl } from "~/utils/serverUrl"

export default function CategoryCard({ item }) {
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
                    <Link to={`/productsList/${category.name}`} className="btn btn-primary">
                      <FaEye />
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