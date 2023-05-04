import { useProfile } from "@/hooks/useProfile"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react"

const HeaderProfile: FC = () => {
    const {profile} = useProfile();
    const router = useRouter();

    if(!profile) {
        return (
          <button 
            className="text-white underline hover:no-underline hover:text-gray mx-8"
            onClick={() => router.push("/auth")}
          >
            Log In
          </button>
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
                border-solid animate-opacity"
              />
            </Link>
        )
      }
    </div>
  )
}

export default HeaderProfile