import { ProductService } from "@/services/product/product.service";
import Catalog from "@/components/UI/Catalog/Catalog";
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SearchPage: NextPage = () => {
    const {query} = useRouter();
    const {data} = useQuery(["search", query.term], 
    () => ProductService.getAll({searchTerm: query.term as string}));

    return (
        <Meta title="Search">
            <Layout>
                <Catalog 
                    products={data?.products || []}
                    title={`Search by request: ${query.term || ""}`}
                />
            </Layout>
        </Meta> 
    )
}

export default SearchPage