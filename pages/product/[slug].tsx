import Title from "@/components/UI/Title";
import { useAction } from "@/hooks/useAction";
import { useCart } from "@/hooks/useCart";
import { ProductService } from "@/services/product/product.service";
import { IProduct } from "@/types/product.interface";
import { priceConverter } from "@/utils/priceConverter";
import Button from "@/components/UI/Button/Button";
import FavoriteButton from "@/components/UI/Catalog/ProductItem/FavoriteButton";
import ProductRating from "@/components/UI/Catalog/ProductItem/ProductRating";
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from "react-tooltip";
import { useAuth } from "@/hooks/useAuth";
import { UserRoles } from "@/store/user/user.interface";
import { useCallback, useMemo, useState } from "react";
import { SizeEnum } from "@/types/size.enum";
import SectionButton from "@/components/UI/Button/SectionButton";
import ProductInfo from "@/components/UI/ProductInfo/ProductInfo";
import dynamic from "next/dynamic";
import Loader from "@/components/UI/Loader";
import ImageGallery from "react-image-gallery";
import Arrow from "@/components/UI/Carousel/Arrow";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { ICarouselImage } from "@/types/carousel.interface";

interface ProductPageProps {
    product: IProduct;
}

enum SectionEnum {
    REVIEWS = "reviews",
    INFO = "info",
}

const ProductReviews = dynamic(() => import("@/components/UI/ProductInfo/ProductReviews/ProductReviews"), {
    loading: () => <Loader bg="transparent"/>
});

const ProductPage: NextPage<ProductPageProps> = ({product}) => {
    const {user} = useAuth();
    const {items} = useCart();
    const {addToCart, removeFromCart} = useAction();
    const isProductInCart = items.find(item => item.product.id === product.id);
    const [activeSection, setActiveSection] = useState<SectionEnum>(SectionEnum.INFO);
    
    const handleClick = useCallback(() => {
        isProductInCart ? removeFromCart({id: isProductInCart.id}) : addToCart({product, quantity: 1, price: product.price});
    }, [isProductInCart]);

    const images: ICarouselImage[] = useMemo(() => product.images.map(image => ({
        original: image,
        loading: "lazy",
        originalAlt: product.name,
        originalClass: "main-carousel-img",
    })), []);

  return (
    <Meta title={`${product.name}`} description={product.description}>
        <Layout>
            <div className="grid gap-10 mb-10" style={{gridTemplateColumns: "2fr 3fr 1fr"}}>
                <div className="col-span-1 h-full w-full">
                    <ImageGallery 
                        items={images}
                        showPlayButton={false}
                        autoPlay={true}
                        slideInterval={5000}
                        additionalClass="image-carousel-container"
                        showThumbnails={false}
                        showFullscreenButton={false}
                        renderLeftNav={(onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, disabled: boolean) => 
                            <Arrow 
                                onClick={onClick}
                                disabled={disabled}
                                className="z-10 left-0 outline-none text-white 
                                hover:text-[#337ab7] transition-all duration-300 font-bold"
                            >
                                <RxCaretLeft size={42}/>
                            </Arrow>
                        }
                        renderRightNav={(onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, disabled: boolean) => (
                            <Arrow 
                                onClick={onClick}
                                disabled={disabled}
                                className="z-10 right-0 outline-none text-white 
                                hover:text-[#337ab7] transition-all duration-300 font-bold"
                            >
                                <RxCaretRight size={42} />
                            </Arrow>
                        )}
                    />
                </div>
                <div className="col-span-1 flex flex-col h-full">
                    <Title className="text-5xl">{product.name}</Title>
                    {user?.role === UserRoles.ADMIN && <span className="font-semibold">id: {product.id}</span>}
                    <p className="text-secondary text-2xl underline mt-14 mb-16">{priceConverter(product.price)}</p>
                    <Button 
                        variant="dark" 
                        onClick={() => handleClick()} 
                        data-tooltip-id="tooltip"
                        data-tooltip-delay-hide={1000}
                        className="w-[300px]"
                    >
                        {isProductInCart ? "Remove from cart" : "Add to cart"}
                    </Button>
                    <Tooltip 
                        id="tooltip"
                        content={isProductInCart ? "Added" : "Removed"}
                        openOnClick
                    />

                    <div className="flex mt-auto">
                        <ProductRating product={product} size={SizeEnum.MD}/>
                    </div>
                </div>
                <div className="col-span-1">
                    <FavoriteButton productId={product.id} className="text-3xl mt-2"/>
                </div>
            </div>
            <div className="flex w-full mb-5">
                <SectionButton 
                    active={activeSection === SectionEnum.INFO}
                    onClick={() => setActiveSection(SectionEnum.INFO)}
                >
                    Information
                </SectionButton>
                <SectionButton 
                    active={activeSection === SectionEnum.REVIEWS}
                    onClick={() => setActiveSection(SectionEnum.REVIEWS)}
                >
                    Reviews
                </SectionButton>

            </div>

            {
                activeSection === SectionEnum.INFO ?
                    (<ProductInfo 
                        description={product.description} 
                        characteristics={product.characteristics}
                    />
                    ) : (
                        <ProductReviews productId={product.id} reviews={product.reviews}/>
                    )
            }
        </Layout>
    </Meta>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const response = await ProductService.getAll();
    const paths = response.products.map(product => ({
        params: {
            slug: product.slug,
        }
    }))
    
    return {
        paths,
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async({params}) => {
    const {data} = await ProductService.getBySlug(params?.slug as string);

    return {
        props: {
            product: data,
        }
    }
}

export default ProductPage