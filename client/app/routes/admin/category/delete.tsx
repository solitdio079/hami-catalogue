import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/categoryRoot";
import { redirect } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
    const { id } = params
    
    try {
        const req = await fetch(serverUrl + `/category/${id}`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        //if (!response.error) return { error: response.error }
        return redirect("/admin/category/all")
        
    } catch (error) {
        return {error}
    }
}