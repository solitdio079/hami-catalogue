import { useFetcher } from "react-router"

export default function CreateCategory() {
    const fetcher = useFetcher()
    return (
        <div className="flex justify-center p-10 w-full">
      <fetcher.Form className="fieldset">
        <label className="fieldset-label">Name</label>
        <input type="text" name="name" className="input" placeholder="Porte" />
        <label className="fieldset-label">Description</label>
        <textarea
          className="textarea"
          name="description"
          placeholder="describe the category"
        ></textarea>
        <label className="fieldset-label">Image</label>
        <input type="file" name="image" className="file-input" />

        <button className="btn btn-neutral mt-4">Create</button>
      </fetcher.Form>
        </div>
    )
}