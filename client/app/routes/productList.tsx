import { serverUrl } from '~/utils/serverUrl'
//import type { Route } from './+types/productsList'

import InfiniteEntity from '~/components/InfinityEntity'
import CategoryCard from '~/components/CategoryCard'
import type { Route } from './+types/productList'
import ProductCard from '~/components/ProductCard'
import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '~/utils/context'
import ProductCardAdmin from '~/components/ProductCardAdmin'


export default function productsList({params}: Route.ComponentProps) {
 const {category} = params
 const user = useContext(UserContext)
  return (
    <div className="flex flex-col w-full">
      <div
        className="hero min-h-96"
        style={{
          backgroundImage:
            'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold"> {category} </h1>
            <p className="mb-5">
              Decouvrez toutes les varietes de produits turques
            </p>
          </div>
        </div>
      </div>
      <div className="breadcrumbs text-sm m-5">
        <ul>
          <li>
            <Link to={"/"}>Accueil</Link>
          </li>
          <li>
            <Link to={"/categoriesList"}>categories</Link>
          </li>
          <li>
            {category}
          </li>
        </ul>
      </div>
      <InfiniteEntity
        loaderRoute={`/loaders/productsList/?category=${category}`}
        fetchMoreURL={serverUrl + `/products/?category=${category}`}
        UnitEntity={user ? ProductCardAdmin :ProductCard}
      />
    </div>
  )
}
