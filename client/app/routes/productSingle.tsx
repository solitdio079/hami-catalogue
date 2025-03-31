import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/productList"
// import Swiper core and required modules
import { Autoplay, Pagination,Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { redirect } from "react-router"
import SimilarProducts from "~/components/SimilarProducts"
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const { id } = params 
    
    try {
        const req = await fetch(serverUrl + `/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        })
        const response = await req.json()
        if(response.error) return redirect("/categoriesList")
        return response
        
    } catch (error) {
        return {error}
    }
    
}
export default function ProductSingle({ loaderData }: Route.ComponentProps) {
    const product = loaderData
    return (
      <>
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
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="-mb-10"
        >
          {product.images.map((image) => (
            <SwiperSlide
              className="w-full max-h-screen"
              key={Math.random() * 10e9}
            >
              {' '}
              <img width="100%" src={serverUrl + '/' + image} />{' '}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex p-5 lg:p-10 w-full flex-wrap">
          {product.images.map((image) => (
            <img
              key={Math.random() * 10e9}
              className="max-h-15 lg:max-h-30 m-3 -mt-20 lg:-mt-40 z-50"
              src={serverUrl + '/' + image}
            />
          ))}
        </div>
        <div className="card w-full p-5 lg:p-5 bg-base-100 card-xl shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-5xl"> {product.name} </h2>
            <p>{product.description}</p>
          </div>
        </div>
        <div>
          <div className="mx-5 mt-10 -mb-3 text-2xl font-bold">
            Produits Similaires
          </div>
          <SimilarProducts category={product.category} />
        </div>
      </>
    )
}