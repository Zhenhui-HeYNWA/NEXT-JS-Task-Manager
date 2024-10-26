import { User } from "@/state/api";
import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  console.log(user.profilePictureUrl);

  return (
    <div className="w-52 gap-2 rounded border px-2 py-4 shadow">
      <div className="flex w-full items-center gap-2">
        <div className="h-16 w-16">
          <Image
            src={
              user.profilePictureUrl
                ? `/${user.profilePictureUrl}`
                : "/avatardefault.png"
            }
            alt="profile picture"
            width={64}
            height={64}
            className="h-full rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-bold">{user.username}</p>
          <p className="flex items-center gap-1 text-gray-500">
            <Mail size={14} />
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
