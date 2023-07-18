import { errorCatch } from "@/api/helper";
import Layout from "@/components/UI/Layout/Layout";
import Loader from "@/components/UI/Loader";
import Meta from "@/components/UI/Meta";
import Title from "@/components/UI/Title";
import { useAction } from "@/hooks/useAction";
import { NextPageAuth } from "@/providers/authProvider/auth-page.types"
import { StatisticsService } from "@/services/statistics.service";
import { TypeProductWithClicks } from "@/types/product.interface";
import { priceConverter } from "@/utils/priceConverter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TopProducts: NextPageAuth = () => {
    const [leaders, setLeaders] = useState<TypeProductWithClicks[]>([]);
    const {setMessage} = useAction();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getLeaders = async() => {
            try {
                const {data} = await StatisticsService.getTop();
                setLeaders(data);
                setIsLoading(false);
            } catch(err) {
                setMessage(errorCatch(err));
            }
        }
        getLeaders();
    }, []);

    if(isLoading) return <Loader bg="transparent"/>
    
    return (
        <Meta title="Top products">
            <Layout>
                    <Title className="font-bold">Top Products</Title>
                    <div className="flex flex-col w-full gap-5 mt-6">
                        {(leaders && leaders.length > 0) ? (leaders?.map(leader => (
                            <Link 
                                href={`/product/${leader.product.slug}`}
                                key={leader.id} 
                                className="flex items-center border border-black 
                                justify-between w-full py-2 px-5 rounded-xl"
                            >
                                <Image 
                                    src={leader.product.images[0]}
                                    alt={leader.product.name}
                                    width={80}
                                    height={80}
                                    className="w-[80px] h-[80px] object-contain rounded-2xl"
                                />
                                <h3 className="text-xl font-bold">{leader.product.name}</h3>
                                <p className="text-lg">{priceConverter(leader.product.price)}</p>
                                <p className="text-lg">Clicks: {leader.count}</p>
                            </Link>
                        ))) : (
                                <h1 className="text-2xl font-bold text-center mt-10">No leaders</h1>
                            )
                        }
                    </div>
            </Layout>
        </Meta>
    )
}

TopProducts.isOnlyAdmin = true;

export default TopProducts