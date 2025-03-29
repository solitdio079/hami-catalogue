import { useEffect } from "react"
import { useFetcher } from "react-router"

export default function CategorySelect() {
    useEffect(() => {
        if(!fetcher.data) fetcher.load("/loaders/categories")
    })
    const fetcher = useFetcher()
    return (
      <>
        {fetcher.data ? (
          <select defaultValue="Pick a color" name="category" className="select">
            {fetcher.data.map((item) => (
              <option key={item._id} value={item.name}> {item.name} </option>
            ))}
          </select>
        ) : (
          ''
        )}
      </>
    )
}