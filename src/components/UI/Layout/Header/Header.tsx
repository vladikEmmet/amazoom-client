import Search from "@/components/UI/Layout/Header/Search"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineHeart } from "react-icons/ai"
import AdminButton from "./AdminButton"
import HeaderCart from "./Cart/HeaderCart"
import HeaderProfile from "./HeaderProfile"

const Header = () => {
  return (
    <header
      className="bg-secondary w-full py-6 px-6 pr-10 grid fixed z-10"
      style={{ gridTemplateColumns: "1fr 3fr 1.2fr" }}
    >
      <Link href="/">
        <Image 
          priority 
          width={180} 
          height={37} 
          src="..//images/logo.svg" 
          alt="Logo"
        />
      </Link>
      <Search />

      <div className="flex items-center justify-end gap-10">
        <AdminButton />
        <Link href="/favorites" className="text-white">
          <AiOutlineHeart size={28} />
        </Link>
        <HeaderCart />
        <HeaderProfile />
      </div>

    </header>
  )
}

export default Header