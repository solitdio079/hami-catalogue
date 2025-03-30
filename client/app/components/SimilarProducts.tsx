import { useEffect } from "react"
import { useFetcher } from "react-router"
// import Swiper core and required modules
import { Autoplay, Pagination,Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import ProductCard from "./ProductCard"

export default function SimilarProducts({ category }) {
    const fetcher = useFetcher()
    useEffect(() => {
        if(!fetcher.data) fetcher.load(`/loaders/productsList/?category=${category}`)
    })
    return (
      <>
        {fetcher.data ? (
          <Swiper
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {' '}
            {fetcher.data.map((product) => (
              <SwiperSlide key={Math.random() * 10e9}>
                <ProductCard item={product} />
              </SwiperSlide>
            ))}{' '}
          </Swiper>
        ) : (
          ''
        )}
      </>
    )
}