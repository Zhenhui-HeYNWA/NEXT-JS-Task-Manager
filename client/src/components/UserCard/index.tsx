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
    <div className="flex w-fit items-center gap-2 rounded border px-4 py-2 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`${user.profilePictureUrl || "/avatardefault.png"}`}
          alt="profile picture"
          width={50}
          height={50}
          className="rounded-full"
        />
      )}

      <div className="w-full items-center">
        <p className="w-full items-center text-pretty text-lg font-bold">
          {user.username}
        </p>
        <p className="flex items-center gap-1 text-gray-500">
          <Mail size={14} />
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
