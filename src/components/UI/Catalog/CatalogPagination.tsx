import { ProductService } from '@/services/product/product.service';
import { ProductSort } from '@/services/product/product.types';
import { TypePaginationProducts } from '@/types/product.interface';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react'
import Button from '../Button/Button';
import Loader from '../Loader';
import Title from '../Title';
import ProductItem from './ProductItem/ProductItem'
import SortMenu from './SortMenu';

interface CatalogPaginationProps  {
    data: TypePaginationProducts;
    title?: string;
}

const CatalogPagination: FC<CatalogPaginationProps> = 
({data, title}) => {
    const [sortType, setSortType] = useState<ProductSort>(ProductSort.NEWEST);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const {data: response, isLoading} = useQuery(
        ["products", sortType, page],
        () => ProductService.getAll({
            sort: sortType,
            page,
            limit,
        }),
        {
            initialData: data,
            keepPreviousData: true,
        }
    )

    if(isLoading) return <Loader />
    
    
  return (
    <section>
        {title && <Title className='mb-5'>{title}</Title>}
        <SortMenu sortType={sortType} setSortType={setSortType} />
        {
            response.products.length ? (
            <>
                <div className='grid grid-cols-4 gap-10'>
                    {response.products.map(product =>

                        <ProductItem key={product.id} product={product} />
                    )}
                </div>
                <div className="text-center mt-16">
                    {
                    Array.from({length: response.length / limit})
                            .map((_, idx) => {
                                const pageNum = idx + 1;
                                return (
                                    <Button
                                        key={pageNum}
                                        variant={page === pageNum ? "light" : "dark"}
                                        onClick={() => setPage(pageNum)}
                                        className="mx-3"
                                    >
                                        {pageNum}
                                    </Button>
                                )
                            })
                    }
                </div>
            </>
            ) : (
                <div>Nothing found</div>
            )
        }
    </section>
  )
}

export default CatalogPagination