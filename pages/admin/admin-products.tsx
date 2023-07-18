import AdminOperations from "@/components/AdminOperations";
import { NextPageAuth } from "@/providers/authProvider/auth-page.types"
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";
import { AdminTypesEnum } from "@/types/AdminOperations";

const AdminProducts: NextPageAuth = () => {
  return (
    <Meta title="Products management">
      <Layout>
        <AdminOperations type={AdminTypesEnum.PRODUCT}/>
      </Layout>
    </Meta>
  )
}

AdminProducts.isOnlyAdmin = true;

export default AdminProducts