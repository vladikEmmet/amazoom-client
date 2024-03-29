import AdminOperations from "@/components/AdminOperations";
import { NextPageAuth } from "@/providers/authProvider/auth-page.types"
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";
import { AdminTypesEnum } from "@/types/AdminOperations";

const AdminCategories: NextPageAuth = () => {
  return (
    <Meta title="Categories management">
      <Layout>
        <AdminOperations type={AdminTypesEnum.CATEGORY}/>
      </Layout>
    </Meta>
  )
}

AdminCategories.isOnlyAdmin = true;

export default AdminCategories