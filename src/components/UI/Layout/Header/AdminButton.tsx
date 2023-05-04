import { useAuth } from "@/hooks/useAuth"
import { UserRoles } from "@/store/user/user.interface";
import { useRouter } from "next/router";

const AdminButton = () => {
    const {user} = useAuth();
    const router = useRouter();

    if(!user || user.role === UserRoles.USER) return null;

  return (
    <button 
        onClick={() => router.push("/admin/admin", "admin")}
        className="text-white underline hover:no-underline disabled:text-gray disabled:no-underline"
        disabled={(/\/admin(\/)?.*/gi).test(router.asPath)}
    >
        Admin panel
    </button>
  )
}

export default AdminButton