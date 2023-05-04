import { useCart } from "@/hooks/useCart";
import { useOutside } from "@/hooks/useOutside";
import SquareButton from "@/components/UI/Button/SquareButton";
import { useRouter } from "next/router";
import { FC } from "react"
import { RiShoppingCartLine } from 'react-icons/ri'
import cn from "clsx"
import styles from "./Cart.module.scss"
import { priceConverter } from "@/utils/priceConverter";
import Button from "@/components/UI/Button/Button";
import CartItem from "./CartItem/CartItem";
import { SizeEnum } from "@/types/size.enum";

const HeaderCart: FC = () => {
    const {isShow, setIsShow, ref} = useOutside(false);
    const {items, total} = useCart();
    
  return (
    <div className="relative" ref={ref}>
        <SquareButton 
            Icon={RiShoppingCartLine}
            onClick={() => setIsShow(!isShow)}
            number={items.length}
        />

        <div className={cn(
                `absolute top-[4.2rem] w-80 -left-[12.5rem]
                bg-secondary rounded-xl px-5 py-3 text-sm
                menu z-[999999] text-white`,
                isShow ? "open-menu" : "close-menu"
            )}
        >

            <div className="font-normal text-lg mg-5">My cart</div>
            
            <div className={styles.cart}>
                {
                    items.length ? (
                        items.map(item => <CartItem item={item} key={item.id}/>)
                    ) : (
                        <div className="font-light">Your cart is empty</div>
                    )
                }
            </div>

            <div className={styles.footer}>
                <div>Total:</div>
                <div>{priceConverter(total)}</div>
            </div>
            {
            !!items.length && 
                <div className="text-center">
                <Button 
                    variant="light" 
                    size={SizeEnum.SM}
                    className="btn-link mt-5 mb-2"
                >
                    Place order
                </Button>
            </div>
            }
        </div>
    </div>
  )
}

export default HeaderCart