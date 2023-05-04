import { TypeProducts } from '@/types/product.interface'
import { FC } from 'react'
import Loader from '../Loader';
import Title from '../Title';
import ProductItem from './ProductItem/ProductItem'

interface CatalogProps extends TypeProducts {
    isLoading?: boolean;
    title?: string;
}

const Catalog: FC<CatalogProps> = 
({products, isLoading, title}) => {

    if(isLoading) return <Loader />
    
    
  return (
    <section>
        {title && <Title className='mb-5'>{title}</Title>}
        {
            products.length ? (
            <>
                <div className='grid grid-cols-4 gap-10'>
                    {products.map(product =>

                        <ProductItem key={product.id} product={product} />
                    )}
                </div>
            </>
            ) : (
                <div>Nothing found</div>
            )
        }
    </section>
  )
}

export default Catalog