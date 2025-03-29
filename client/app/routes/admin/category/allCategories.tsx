import { serverUrl } from '~/utils/serverUrl'
import type { Route } from './+types/allCategories'

import InfiniteEntity from '~/components/InfinityEntity'
import CategoryCardAdmin from '~/components/CategoryCardAdmin'


export default function AllCategories() {


  return (
    <div className='p-10 flex flex-wrap w-full'>
      <InfiniteEntity
        loaderRoute={'/loaders/categories'}
        fetchMoreURL={serverUrl + '/category/'}
        UnitEntity={CategoryCardAdmin}
      />
    </div>
  )
}
