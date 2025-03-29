import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/edit";
import { useFetcher } from "react-router";
import toast, {Toaster} from 'react-hot-toast'
import { useEffect } from "react";


export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const {id} = params
    const formData = await request.formData();
  
    //console.log(bodyObject);
    let fetchMethod = "PUT"
    let fetchHeader = {}
    let fetchBody = formData
    console.log(formData.get('image').name)
    if (formData.get("image").name === "") {
          fetchMethod = 'PATCH'
          fetchHeader = {'Content-Type': 'application/json'}
          fetchBody = JSON.stringify(Object.fromEntries(formData))
    }
    try {
        const req = await fetch(serverUrl + `/category/${id}`, {
            method: fetchMethod,
            credentials: 'include',
            headers: fetchHeader,
            mode:'cors',
            body:fetchBody
        })
        const response = await req.json()
        if (response.error) return response
        return {msg: `Product with ID: ${response._id}  created`}
        
    } catch (error) {
        return {error}
    }
}


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
    const fetcher = useFetcher()
    
     useEffect(() => {
       const toastOptions = { duration: 5000 }
       fetcher.data
         ? fetcher.data.msg
           ? toast.success(fetcher.data.msg, toastOptions)
           : toast.error(fetcher.data.error, toastOptions)
         : ''
     })
    
    return (
      <div className="flex w-full justify-center p-10">
        {category ? (
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img src={serverUrl + '/' + category.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <fetcher.Form
                encType="multipart/form-data"
                method="post"
                className="fieldset"
              >
                <label className="fieldset-label">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={category.name}
                  className="input"
                  placeholder="Porte"
                />
                <label className="fieldset-label">Description</label>
                <textarea
                  className="textarea"
                  name="description"
                  defaultValue={category.description}
                >
                </textarea>
                <label className="fieldset-label">Image</label>
                <Toaster />
                <input type="file" name="image" className="file-input" />

                <button className="btn btn-warning mt-4">
                  {' '}
                  {fetcher.state === 'idle' ? (
                    'Edit'
                  ) : (
                    <span className="loading loading-ball"></span>
                  )}
                </button>
              </fetcher.Form>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
}