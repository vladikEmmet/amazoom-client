import Button from "@/components/UI/Button/Button"
import { AdminOpearionsEnum, AdminTypesEnum } from "@/types/AdminOperations";
import { FC, useState } from "react";
import AdminModal from "./AdminModal/AdminModal";
import UpdateProduct from "./AdminModal/UpdateProduct";

interface AdminOperationsProps {
    type: AdminTypesEnum;
}

const AdminOperations: FC<AdminOperationsProps> = ({type}) => {
    const [operation, setOperation] = useState<AdminOpearionsEnum | null>(null);
    
  return (
    <>
        <div className="flex justify-evenly gap-10">
            <Button variant="light" onClick={() => setOperation(AdminOpearionsEnum.CREATE)}>
                {`Create ${type}`}
            </Button>
            <Button variant="light" onClick={() => setOperation(AdminOpearionsEnum.UPDATE)}>
                {`Edit ${type}`}
            </Button>
            <Button variant="light" onClick={() => setOperation(AdminOpearionsEnum.DELETE)}>
                {`Delete ${type}`}
            </Button>
        </div>
        {!operation ? null :
            (operation === "delete" || type === "category") ?
            ( 
            <AdminModal 
                type={type} 
                operation={operation} 
                hideModal={() => setOperation(null)}
            />) : (
                <UpdateProduct 
                    operation={operation}
                    hideUpdateModal={() => setOperation(null)}
                />
            )
        }
    </>
    
  )
}

export default AdminOperations