import { serverUrl } from '~/utils/serverUrl'
//import type { Route } from './+types/categoriesList'

import InfiniteEntity from '~/components/InfinityEntity'
import CategoryCard from '~/components/CategoryCard'
import { Link } from 'react-router'


export default function CategoriesList() {


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
            <h1 className="mb-5 text-5xl font-bold">Nos Categories</h1>
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
            categories
          </li>
         
        </ul>
      </div>
      <InfiniteEntity
        loaderRoute={'/loaders/categories'}
        fetchMoreURL={serverUrl + '/category/'}
        UnitEntity={CategoryCard}
      />
    </div>
  )
}
