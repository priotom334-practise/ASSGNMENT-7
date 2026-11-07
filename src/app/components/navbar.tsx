import { Suspense } from "react";
import Image from "next/image";
import { connection } from "next/server";
import UserInfo from "./User";
import Items from "./items";
import Marquee from "./Marquee";
import Link from "next/link";

async function DateLabel() {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return <p className="text-xs text-neutral-500">{date}</p>;
}

const NavPage = () => {
    return (<>
        <header className="container mx-auto border-b border-neutral-200 bg-white px-4">
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <Image src="/logo-icon.png" alt="logo"
                        width={30} height={30}
                        className="h-10 w-10 object-contain brightness-110 contrast-125 border-8 bg-green-600 rounded-2xl" />
                    <div >
                        <Link href="/" ><h1>বাজার দর</h1></Link>
                        <Suspense fallback={<span className="loading loading-spinner loading-xs"/>}>
                            <DateLabel />
                        </Suspense>
                    </div>
                </div>
                <div>
                    <UserInfo />
                </div>
            </div>
            <div className="pb-2">
                <Suspense fallback={<div className="h-10" aria-hidden="true" />}>
                    <Items />
                </Suspense>
            </div>
        </header>
        <Suspense fallback={<div className="h-7" aria-hidden="true" />}>
            <Marquee />
        </Suspense>
    </>
    );
};

export default NavPage;