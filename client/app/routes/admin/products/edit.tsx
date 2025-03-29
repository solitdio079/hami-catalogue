import type { Route } from "./+types/edit";
// import Swiper core and required modules
import {Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { serverUrl } from "~/utils/serverUrl";
import { Form, Link, redirect, useFetcher } from 'react-router'
import toast, {Toaster} from "react-hot-toast";
import CategorySelect from "~/components/categorySelect";
import { useEffect } from "react";


export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const {id} = params
    const formData = await request.formData();
  
    //console.log(bodyObject);
    let fetchMethod = "PUT"
    let fetchHeader = {}
    let fetchBody = formData
    //console.log(formData.get('images').name)
    if (formData.get("images").name === "") {
          fetchMethod = 'PATCH'
          fetchHeader = {'Content-Type': 'application/json'}
          fetchBody = JSON.stringify(Object.fromEntries(formData))
    }
  console.log(fetchMethod)
    try {
        const req = await fetch(serverUrl + `/products/${id}`, {
            method: fetchMethod,
            credentials: 'include',
            headers: fetchHeader,
            mode:'cors',
            body:fetchBody
        })
        const response = await req.json()
        if (response.error) return response
        return {msg: `Product with ID: ${response._id}  updated`}
        
    } catch (error) {
        return {error}
    }
}


export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const { id } = params 
    
    try {
        const req = await fetch(serverUrl + `/products/${id}`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}
        })
        const response = await req.json()
        if(response.error) return redirect("/admin/products/all")
        return response
        
    } catch (error) {
        return {error}
    }
    
}
export default function EditProduct({ loaderData }: Route.ComponentProps) {
    const product = loaderData
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
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
            >
              {product.images.map((image) => (
                <SwiperSlide key={Math.random() * 10e9}>
                  {' '}
                  <img width="100%" src={serverUrl + '/' + image} />{' '}
                </SwiperSlide>
              ))}
            </Swiper>
          </figure>
          <div className="card-body text-neutral">
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
                defaultValue={product.name}
                className="input"
                placeholder="Porte"
              />
              <label className="fieldset-label">Description</label>
              <textarea
                className="textarea"
                name="description"
                defaultValue={product.description}
                        ></textarea>
                         <CategorySelect previous={product.category} />
              <label className="fieldset-label">Images (max:4)</label>
              <Toaster />
              <input type="file" multiple name="images" className="file-input" />

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
      </div>
    )
}