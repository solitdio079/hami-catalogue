import { useEffect } from "react"
import { useFetcher } from "react-router"
import type { Route } from "../+types/root"

export default function CategorySelect({previous}) {
     const fetcher = useFetcher()
    useEffect(() => {
        if(!fetcher.data) fetcher.load("/loaders/categories")
    },[fetcher.data])
   
    return (
      <>
        {fetcher.data ? (
          <select name="category" defaultValue={previous} className="select">
            {fetcher.data.map((item:any) => (
              <option key={item._id} value={item.name}> {item.name} </option>
            ))}
          </select>
        ) : (
          ''
        )}
      </>
    )
}