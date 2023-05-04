import { ProductService } from "@/services/product/product.service";
import { TypePaginationProducts, TypeProducts } from "@/types/product.interface";
import Home from "@screens/Home/Home";
import { GetStaticProps, NextPage } from "next";

const HomePage: NextPage<TypePaginationProducts> = ({length, products}) => {
  return (
    <Home products={products} length={length}/>
  );
};

export const getStaticProps: GetStaticProps<TypePaginationProducts> =
  async () => {
    const data = await ProductService.getAll({
      page: 1,
      limit: 10,
    });

    return {
      props: data,
    }
  }

export default HomePage;