import { SizeEnum } from "@/types/size.enum";
import { useRouter } from "next/router"
import { FC } from "react"
import Button from "../../UI/Button/Button"

const AdminPanel: FC = () => {
  const router = useRouter();
  
  return (
    <div className="flex justify-around gap-10 flex-row">
        <Button variant="light" size={SizeEnum.LG} onClick={() => router.push("admin-products", "products")}>
          Products
        </Button>
        <Button variant="light" size={SizeEnum.LG} onClick={() => router.push("admin-categories", "categories")}>
          Categories
        </Button>
        <Button variant="light" size={SizeEnum.LG} onClick={() => router.push("admin-carousel", "carousel")}>
          Carousel
        </Button>
        <Button variant="light" size={SizeEnum.LG} onClick={() => router.push("top-products")}>
          Most popular products
        </Button>
        <Button variant="light" size={SizeEnum.LG} onClick={() => router.push("user-info")}>
          User info
        </Button>
    </div>
  )
}

export default AdminPanel