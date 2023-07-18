import { ICartItem } from "@/types/cart.interface"
import { priceConverter } from "@/utils/priceConverter";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"
import styles from "../Cart.module.scss"
import CartActions from "./cartActions/CartActions";

interface CartItemProps {
    item: ICartItem;
}

const CartItem: FC<CartItemProps> = ({item}) => {
  return (
    <div className={styles.item}>
        <Image 
            width={100}
            height={100}
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-[100px] h-[100px] object-contain mb-1 bg-white"
        />
        <div>
            <Link href={`product/${item.product.slug}`}>
              <div className={styles.name}>{item.product.name}</div>
            </Link>
            <div className={styles.price}>{priceConverter(item.product.price)}</div>

            <CartActions item={item}/>
        </div>
    </div>
  )
}

export default CartItem