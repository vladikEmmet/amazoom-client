import { FC } from "react";
import styles from './Modal.module.scss'
import cn from 'clsx'
import Title from "../Title";
import { HiXMark } from 'react-icons/hi2'

interface ModalProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
    onClose?: () => void;
}

const Modal: FC<ModalProps> = ({title, className, onClose, children}) => {
  return (
    <div className={styles.curtain}>
        <div
            className={cn("bg-white w-1/2 rounded-xl flex flex-col items-center justify-around text-xl p-5", {
                "relative": onClose
            }, className)}
        >
            {title && <Title className="text-center font-semibold text-2xl mb-3">{title}</Title>}
            {
                onClose && 
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-transparent border-none"
                >
                    <HiXMark size={28}/>
                </button>
            }
            {children}
        </div>
    </div>
  )
}

export default Modal