import { serverUrl } from '~/utils/serverUrl'
import type { Route } from '.react-router/types/app/loaders/+types/allProducts'
import InfiniteEntity from '~/components/InfinityEntity'
import CategoryCardAdmin from '~/components/CategoryCardAdmin'
import ProductCardAdmin from '~/components/ProductCardAdmin'


export default function AllProducts() {


  return (
    <div className='p-10 flex flex-wrap w-full'>
      <InfiniteEntity
        loaderRoute={'/loaders/products'}
        fetchMoreURL={serverUrl + '/products/'}
        UnitEntity={ProductCardAdmin}
      />
    </div>
  )
}
