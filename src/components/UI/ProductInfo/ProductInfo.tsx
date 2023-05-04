import { ICharacteristic } from "@/types/product.interface"
import { FC } from "react";
import Title from "../Title";
import Row from "./Row";

interface ProductInfoProps {
    description?: string;
    characteristics?: ICharacteristic[];
}

const ProductInfo: FC<ProductInfoProps> = ({description, characteristics}) => {
    if(!description && (!characteristics?.length)) {
        return <Title className="text-2xl">{"No information about this product :("}</Title>
    }

  return (
    <div>
        {characteristics?.length &&
            <>
                <Title className="mb-10 ml-5">Characteristics</Title>
                <div className="rounded-xl border-2 border-black overflow-hidden">
                    {characteristics.map((c, idx) => 
                        <Row 
                            name={c.name} 
                            value={c.value} 
                            key={c.name}
                            className={idx % 2 ? "bg-gray" : "bg-white"}
                        />
                    )}
                </div>
             </>
        }
        {description &&
            <>
                <Title className="my-10 ml-5">Description</Title>
                <p>{description}</p>
            </>
        }
    </div>
  )
}

export default ProductInfo