import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/productRoot";
import { redirect } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
    const { id } = params
    
    try {
        const req = await fetch(serverUrl + `/products/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            credentials: 'include'
        })

        const response = await req.json()
        if(response.error) return redirect('/admin/products/create')
        return redirect("/admin/products/all")
        
    } catch (error) {
        return {error}
    }
}