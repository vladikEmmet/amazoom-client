import { useAction } from "@/hooks/useAction";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/types/product.interface";
import { FC } from "react";
import {RiShoppingCartFill, RiShoppingCartLine} from "react-icons/ri";

const AddToCartButton: FC<{product: IProduct}> = ({product}) => {
    const {addToCart, removeFromCart} = useAction();
    const {items} = useCart();
    
    const curEl = items.find(i => i.product.id === product.id);
    
  return (
    <div>
        <button 
            className="text-secondary"
            onClick={() => curEl 
                ? removeFromCart({id: curEl.id}) 
                : addToCart({
                    product,
                    quantity: 1,
                    price: product.price,
            })}
        >
            {curEl ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
        </button>
    </div>
  )
}

export default AddToCartButton;