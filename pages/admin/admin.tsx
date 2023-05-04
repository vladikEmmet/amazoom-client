import { NextPageAuth } from "@/providers/authProvider/auth-page.types";
import AdminPanel from "@screens/AdminPanel/AdminPanel";
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta"

const Admin: NextPageAuth = () => { 
  return (
    <Meta title="Admin panel">
        <Layout>
            <AdminPanel />
        </Layout>
    </Meta>
  )
}

Admin.isOnlyAdmin = true;

export default Admin