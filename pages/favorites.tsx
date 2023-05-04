import { useProfile } from "@/hooks/useProfile";
import { NextPageAuth } from "@/providers/authProvider/auth-page.types";
import Catalog from "@/components/UI/Catalog/Catalog";
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";

const FavoritesPage: NextPageAuth = () => {
    const {profile} = useProfile();

    return (
        <Meta title="Favorites">
            <Layout>
                <Catalog 
                    products={profile?.favorites || []} 
                    title="Favorites"
                />
            </Layout>
        </Meta>
    )
}

FavoritesPage.isOnlyUser = true;

export default FavoritesPage