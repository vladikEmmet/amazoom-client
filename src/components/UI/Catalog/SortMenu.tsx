import { ProductSort } from "@/services/product/product.types"
import { filterConfig } from "@/utils/filterConfig";
import { Dispatch, FC, SetStateAction, useMemo } from "react"
import Select, { components, createFilter, InputActionMeta } from "react-select"
import makeAnimated from 'react-select/animated';

interface SortMenuProps {
    sortType: ProductSort;
    setSortType: Dispatch<SetStateAction<ProductSort>>;
} 

const SortMenu: FC<SortMenuProps> = ({sortType, setSortType}) => {
    const sortedItems = useMemo(() => 
        (Object.keys(ProductSort) as Array<keyof typeof ProductSort>)
            .map(key => {
                return {
                    value: key,
                    label: ProductSort[key]
                }
            }), [ProductSort])

    const animatedItems = makeAnimated();

  return (
    <div className="text-right mb-5">
        <Select 
            components={animatedItems}
            defaultValue={sortedItems[2]}
            options={sortedItems}
            isSearchable
            onChange={(value: any) => {
                setSortType(value?.label  || ProductSort.NEWEST)
            }}
            filterOption={createFilter(filterConfig)}
            className="bg-white z-5"
        />
    </div>
  )
}

export default SortMenu