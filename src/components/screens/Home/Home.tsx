import { TypePaginationProducts } from '@/types/product.interface'
import CatalogPagination from '@/components/UI/Catalog/CatalogPagination'
import Layout from '@/components/UI/Layout/Layout'
import Meta from '@/components/UI/Meta'
import React, { FC } from 'react'
import Carousel from '@/components/UI/Carousel/Carousel'

const Home: FC<TypePaginationProducts> = ({products, length}) => {
  
  return (
    <Meta title="Homepage">
      <Layout>
        <Carousel 
          name="main" 
          className="h-[400px] mb-5"
          showBullets={true}
        />
        <CatalogPagination 
          title="Novelties" 
          data={{products, length}}
        />
      </Layout>
    </Meta>
  )
}

export default Home