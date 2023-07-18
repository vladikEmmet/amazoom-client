import { useAction } from "@/hooks/useAction"
import { useAuth } from "@/hooks/useAuth"
import { CategoryService } from "@/services/category.service"
import Loader from "@/components/UI/Loader"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import cn from "clsx"
import { FiLogOut } from "react-icons/fi"
import { UserRoles } from "@/store/user/user.interface"

const Sidebar: FC = () => {
  const {data, isLoading} = useQuery(["get categories"],
  () => CategoryService.getAll(),
  {
    select: ({data}) => data,
  })
  const router = useRouter();
  const {user} = useAuth();
  const {logout} = useAction();

  const handleLogout = () => {
    logout();
    router.reload();
  }
  
  return (
    <aside 
      className="flex flex-col justify-between bg-secondary pt-[91px] fixed w-[15%] h-[100%]"
    >
        <div className="h-full flex flex-col">
          {
            isLoading ? 
            (<Loader bg="transparent"/>) :
            (data && data.length) ? (
              <>
                <div className="text-xl text-white mt-5 mb-6 ml-6">
                  Categories:
                </div>
                <ul>
                  {data.map(category => 
                    <li key={category.id}>
                      <Link className={cn(
                        `block text-lg my-3 px-10 hover:text-primary
                        transition-colors duration-200`,
                        router.asPath === `/category/${category.slug}` ? "text-primary" : "text-white"
                      )}
                      href={`/category/${category.slug}`}
                      >
                        {category.name}
                        {
                          user?.role === UserRoles.ADMIN && 
                            <span className="ml-1">(id: {category.id})</span>
                        }
                      </Link>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <div className="text-white text-xl">No categories</div>
            )
          }
          {!!user && (
          <button
            className="text-white flex items-center ml-10 mb-10 mt-auto"
            onClick={handleLogout}
          >
            <FiLogOut />
            <span className="ml-2">Logout</span>
          </button>
        )}
        </div>
    </aside>
  )
}

export default Sidebar