import { useProfile } from "@/hooks/useProfile"
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react"
import { createPortal } from "react-dom";
import Loader from "../../Loader";

const Auth = dynamic(() => import("../../../screens/auth/Auth"), {
  ssr: false,
  loading: () => <Loader bg="transparent"/>
});

const HeaderProfile: FC = () => {
    const {profile} = useProfile();
    const [showModal, setShowModal] = useState(false);

    const onClose = () => setShowModal(false);
    const show = () => {
      setShowModal(true)
    }

    if(!profile) {
        return (
          <>
            <button 
              className="text-white underline hover:no-underline hover:text-gray mx-8"
              onClick={show}
            >
              Log In
            </button>
            {showModal && createPortal(<Auth onClose={onClose}/>, document.querySelector("#portal") as any)}
          </>
        )
    }
    
  return (
    <div>
        {profile?.avatarPath && (
            <Link href="/account">
              <Image 
                width={43}
                height={43}
                src={profile?.avatarPath || "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="}
                alt="profile"
                className="rounded-full border-primary border
                border-solid animate-opacity overflow-hidden"
              />
            </Link>
        )
      }
    </div>
  )
}

export default HeaderProfile