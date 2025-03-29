import { serverUrl } from "~/utils/serverUrl"
import type { Route } from '../+types/root'
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  //const tag = url.searchParams.get('tag')
  try {
    const response = await fetch(
      serverUrl + `/products/?cursor=&limit=${10}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const allProducts = await response.json()
    // console.log(allPosts)
    return allProducts
  } catch (error) {
    return { error: error }
  }
}
