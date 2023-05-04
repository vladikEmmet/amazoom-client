import { errorCatch } from "@/api/helper";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";
import Title from "@/components/UI/Title";
import { useAction } from "@/hooks/useAction";
import { useProfile } from "@/hooks/useProfile";
import { NextPageAuth } from "@/providers/authProvider/auth-page.types";
import { StatisticsService } from "@/services/statistics.service";
import { useState } from "react";
import { IStatisticMain } from "@/types/statictic.interface";
import Loader from "@/components/UI/Loader";
import UserInfoComponent from "@/components/UI/UserInfoComponent";


const UserInfo: NextPageAuth = () => {
    const [id, setId] = useState<string>("");
    const [info, setInfo] = useState<IStatisticMain[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setMessage} = useAction();
    const {profile} = useProfile();

    const getUser = async () => {
        try {
            setIsLoading(true);
            const {data} = await StatisticsService.getMain(id);
            setInfo(data);
            setIsLoading(false);
        } catch(err) {
            setMessage(errorCatch(err))
        }

    }
    
  return (
    <Meta title="User info">
        <Layout>
            {!isLoading && !info ? (
                <>
                    <Title className="text-center">User info</Title>
                    <div className="flex flex-col items-center mt-10">
                        <div className="flex flex-col justify-between items-center mb-10">
                            <Input
                                type="number"
                                placeholder="Enter user id"
                                onChange={e => setId(e.target.value)}
                                value={id}
                                withTitle={false}
                                min={0}
                            />
                            <Button 
                                variant="light"
                                onClick={() => setId(String(profile?.id || ""))}
                            >
                                Get my info
                            </Button>
                        </div>
                        {id.length > 0 && (
                            <Button
                                variant="dark"
                                onClick={getUser}
                            >
                                Get user info
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <Title className="text-center mb-5">User ID: {id}</Title>
                    <UserInfoComponent info={info || []} isLoading={isLoading}/>
                </>
            )}
        </Layout>
    </Meta>
  )
}

UserInfo.isOnlyAdmin = true;

export default UserInfo;