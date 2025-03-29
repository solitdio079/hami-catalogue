// import Swiper core and required modules
import {Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { serverUrl } from '~/utils/serverUrl'
import { Form, Link } from 'react-router'
import { FaPencil, FaX } from 'react-icons/fa6'
export default function ProductCardAdmin({ item }) {
  const product = item
  return (
    <>
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
          <h2 className="card-title"> {product.name} </h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <Form
              method="post"
              action={`/admin/products/delete/${product._id}`}
            >
              {' '}
              <button className="btn btn-error">
                <FaX /> Delete
              </button>
            </Form>
            <Link
              to={`/admin/products/edit/${product._id}`}
              className="btn btn-warning"
            >
              {' '}
              <FaPencil /> Edit{' '}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
