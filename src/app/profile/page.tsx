"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        return window.localStorage.getItem("profileImage");
    });

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/signin");
        }
    }, [session, isPending, router]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result as string;
            setCustomAvatar(imageData);
            window.localStorage.setItem("profileImage", imageData);
            window.dispatchEvent(new Event("profile-avatar-updated"));
            router.refresh();
        };
        reader.readAsDataURL(file);
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace("/signin");
    };

    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-neutral-600">
                লোড হচ্ছে...
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const userName = session.user?.name || "User";
    const userEmail = session.user?.email || "user@example.com";
    const authAvatar = (session.user as { image?: string; avatar?: string; picture?: string } | undefined)?.image
        || (session.user as { image?: string; avatar?: string; picture?: string } | undefined)?.avatar
        || (session.user as { image?: string; avatar?: string; picture?: string } | undefined)?.picture
        || null;
    const avatarSrc = customAvatar || authAvatar;

    return (
        <main className="min-h-[70vh] bg-[#f3f3f3] px-4 py-10">
            <div className="container mx-auto max-w-4xl rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8 flex items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                    <div>
                        <p className="text-sm text-neutral-500">প্রোফাইল</p>
                        <h1 className="text-2xl font-bold text-neutral-900">অ্যাকাউন্ট</h1>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:text-red-600"
                    >
                        সাইন আউট
                    </button>
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#e5e7eb] bg-neutral-100 text-2xl font-bold text-neutral-700">
                            {avatarSrc ? (
                                <Image src={avatarSrc} alt={userName} width={80} height={80} className="h-full w-full object-cover" />
                            ) : (
                                <span>{userName.charAt(0).toUpperCase()}</span>
                            )}
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-neutral-900">{userName}</h2>
                            <p className="text-sm text-neutral-500">{userEmail}</p>
                        </div>
                    </div>

                    <label className="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#2bc06a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#22a65a]">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        ইমেজ আপলোড
                    </label>
                </div>




                <div className="mt-8 flex justify-start">
                    <Link href="/" className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-green-300 hover:text-green-700">
                        হোমে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;