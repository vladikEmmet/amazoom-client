import Button from "@/components/UI/Button/Button";
import Layout from "@/components/UI/Layout/Layout";
import Meta from "@/components/UI/Meta";
import ProfileForm from "@/components/UI/ProfileForm";
import { useProfile } from "@/hooks/useProfile";
import { NextPageAuth } from "@/providers/authProvider/auth-page.types"
import { SizeEnum } from "@/types/size.enum";
import { phoneParser } from "@/utils/phoneParser";
import Image from "next/image";
import { useState } from "react";
import cn from 'clsx'

const Account: NextPageAuth = () => {
    const {profile} = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [isPhotoEditing, setIsPhotoEditing] = useState(false);

    if(!profile) return null;

    const handleChangePhoto = () => {
        if(!isEditing) return;
        setIsPhotoEditing(true);
    }
    
  return (
    <Meta title="Account">
        <Layout>
            <div className="flex items-center flex-col">
                <div className="flex flex-col items-center justify-center">
                    <Image 
                        width={100}
                        height={100}
                        alt="Avatar"
                        src={isEditing ? "https://static.thenounproject.com/png/396915-200.png" : profile?.avatarPath}
                        className={cn("rounded-full shadow-2xl", {
                            "cursor-pointer": isEditing,
                        })}
                        onClick={handleChangePhoto}
                    />
                </div>

                <div className="mt-5">
                    {!isEditing ? (
                        <div className="flex flex-col">
                            <ul className="mb-10">
                                <li>
                                    Email: {profile.email}
                                </li>
                                <li>
                                    Phone number: {phoneParser(profile.phone)}
                                </li>
                                <li>
                                    Name: {profile.name || "none"}
                                </li>
                            </ul>

                            <Button 
                                variant="dark" 
                                onClick={() => setIsEditing(true)}
                                className="self-end"
                                size={SizeEnum.SM}
                            >
                                Edit profile
                            </Button>
                        </div>
                        ) : (
                            <ProfileForm 
                                user={profile} 
                                hideForm={() => setIsEditing(false)}
                                isPhotoEditing={isPhotoEditing}
                            />
                        )
                    }
                </div>
            </div>
        </Layout>
    </Meta>
  )
}

Account.isOnlyUser = true;

export default Account