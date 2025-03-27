import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/edit";

export async function clientLoader({params}:Route.ClientLoaderArgs) {
    const { id } = params 
    try {
        const req = await fetch(serverUrl + `/category/${id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',

        })
        const response = await req.json()
        if (response.error) {
            console.log(response.error);
            return null
        } 
        return response
        
    } catch (error) {
        return {error}
    }
}

export default function EditCategory({ loaderData }: Route.ComponentProps) {
    const category = loaderData

    return (
      <>
        {category ? (
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src={serverUrl+"/"+category.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title"> {category.name} </h2>
              <p>
                {category.description}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Edit</button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    )
}