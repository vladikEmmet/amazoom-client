import Button from "@/components/UI/Button/Button"
import { FC, useState } from "react";
import AdminModal from "./AdminModal/AdminModal";
import UpdateProduct from "./AdminModal/UpdateProduct";

interface AdminOperationsProps {
    type: "product" | "category";
}

const AdminOperations: FC<AdminOperationsProps> = ({type}) => {
    const [operation, setOperation] = useState<"create" | "update" | "delete" | null>(null);
    
  return (
    <>
        <div className="flex justify-evenly gap-10">
            <Button variant="light" onClick={() => setOperation("create")}>
                {`Create ${type}`}
            </Button>
            <Button variant="light" onClick={() => setOperation("update")}>
                {`Edit ${type}`}
            </Button>
            <Button variant="light" onClick={() => setOperation("delete")}>
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