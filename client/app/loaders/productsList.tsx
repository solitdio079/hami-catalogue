import { serverUrl } from "~/utils/serverUrl"
import type { Route } from '../+types/root'
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category')
  try {
    const response = await fetch(
      serverUrl + `/products/?cursor=&limit=${10}&category=${category}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const allProducts = await response.json()
    return allProducts
  } catch (error) {
    return { error: error }
  }
}
