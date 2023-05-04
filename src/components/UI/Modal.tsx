import { useModal } from "@/hooks/useModal";
import { FC } from "react";
import cn from 'clsx'
import { ImCross } from 'react-icons/im'
import { useAction } from "@/hooks/useAction";

const Modal: FC = () => {
    const {message} = useModal();
    const {resetMessage} = useAction();
    return (
        <div 
            className={cn(`transition-all duration-1000 w-full
            px-5 py-10 bg-opacity-50 bg-gray text-secondary text-center
            fixed bottom-0 left-0`, {
                "opacity-0 -z-10": message.length <= 0,
                "opacity-100 z-10": message.length > 0
            })}
        >
            <button 
                className="bg-black rounded-full cursor-pointer p-3 absolute -top-3 right-10"
                onClick={() => resetMessage()}
            >
                <ImCross color="#fff"/>
            </button>
            {message}
        </div>
    )
}

export default Modal