import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product/product.service";
import { ICategory } from "@/types/category.interface";
import { IProduct } from "@/types/product.interface";
import Catalog from "@/components/UI/Catalog/Catalog";
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface CategoryPageProps {
    products: IProduct[];
    category: ICategory;
}

const CategoryPage: NextPage<CategoryPageProps> =
({products, category}) => {
    return (
        <Meta title={category.name}>
            <Layout>
                <Catalog 
                    products={products || []}
                    title={category.name}
                />
            </Layout>
        </Meta>
    )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const categories = await CategoryService.getAll();

    const paths = categories.data.map(category => {
        return {
            params: {
                slug: category.slug,
            }
        }
    });

    return {paths, fallback: "blocking"}
}

export const getStaticProps: GetStaticProps = async({params}) => {
    const {data: products} = await ProductService.getByCategory(params?.slug as string);
    const {data: category} = await CategoryService.getBySlug(params?.slug as string);

    return {
        props: {
            products,
            category,
        }
    }
}

export default CategoryPage