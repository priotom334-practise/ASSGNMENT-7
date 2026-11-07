"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user as
    | {
        name?: string;
        image?: string;
        avatar?: string;
        picture?: string;
      }
    | undefined;

  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("profileImage");
  });

  useEffect(() => {
    const syncAvatar = () => {
      const savedAvatar = window.localStorage.getItem("profileImage");
      setCustomAvatar(savedAvatar);
    };

    syncAvatar();

    window.addEventListener("storage", syncAvatar);
    window.addEventListener("profile-avatar-updated", syncAvatar);

    return () => {
      window.removeEventListener("storage", syncAvatar);
      window.removeEventListener("profile-avatar-updated", syncAvatar);
    };
  }, []);

  const displayName = user?.name || "User";
  const authAvatar = user?.image || user?.avatar || user?.picture || null;
  const avatarSrc = customAvatar || authAvatar;

  return (
    <div className="flex items-center justify-end">
      {user ? (
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-2 py-1.5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-sm font-bold text-neutral-700 ring-2 ring-white">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={displayName}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{displayName.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <span className="text-sm font-semibold text-neutral-800">{displayName}</span>
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/signin">
            <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700">
              সাইন ইন
            </button>
          </Link>
          <Link href="/signup">
            <button className="btn bg-red-700 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-red-800">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;