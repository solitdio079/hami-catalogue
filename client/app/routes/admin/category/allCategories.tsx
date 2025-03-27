import { serverUrl } from '~/utils/serverUrl'
import type { Route } from './+types/allCategories'

import InfiniteEntity from '~/components/InfinityEntity'
import CategoryCardAdmin from '~/components/CategoryCardAdmin'


export default function AllCategories() {


  return (
    <>
      <InfiniteEntity
        loaderRoute={'/loaders/categories'}
        fetchMoreURL={serverUrl + '/category/'}
        UnitEntity={CategoryCardAdmin}
      />
    </>
  )
}
