import { useFetcher } from "react-router"
import type { Route } from "./+types/create"
import { serverUrl } from "~/utils/serverUrl";
import { useEffect } from "react";
import toast, {Toaster} from 'react-hot-toast'


export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();

    try {
        const req = await fetch(serverUrl + "/category/", {
            method: "POST",
            credentials: 'include',
            mode:'cors',
            body:formData
        })
        const response = await req.json()
        if (response.error) return response
        return {msg: `Category with ID: ${response._id}  created`}
        
    } catch (error) {
        return {error}
    }
}

export default function CreateCategory() {
    const fetcher = useFetcher()

    useEffect(() => {
        const toastOptions = { duration: 5000 }
        fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions) : toast.error(fetcher.data.error,toastOptions):''
    })
    return (
        <div className="flex justify-center p-10 w-full">
      <fetcher.Form encType="multipart/form-data" method="post" className="fieldset">
        <label className="fieldset-label">Name</label>
        <input type="text" name="name" required className="input" placeholder="Porte" />
        <label className="fieldset-label">Description</label>
        <textarea
          className="textarea"
          name="description"
          placeholder="describe the category"
        ></textarea>
                <label className="fieldset-label">Image</label>
                <Toaster/>
        <input type="file" required name="image" className="file-input" />

        <button className="btn btn-neutral mt-4"> {fetcher.state === 'idle' ? 'Create':<span className="loading loading-ball"></span>}</button>
      </fetcher.Form>
        </div>
    )
}