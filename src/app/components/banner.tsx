"use client";
import Image from "next/image";
import Link from "next/link";

const todayLabel = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
});

const Banner = () => {
    


        return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-[#f3f5f5] px-6 py-8 md:flex-row md:px-8 md:py-10">
                <div className="flex flex-col gap-4 md:w-1/2">
                    <p className="w-fit rounded-2xl bg-green-300 px-3 py-1 text-xs font-medium text-green-900">
                        {todayLabel}
                    </p>
                    <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>
                    <p className="text-base text-neutral-700">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
                        সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <Link
                        href="/#all-products"
                        className="w-fit rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                    >
                        সব পন্য দেখুন
                    </Link>
                </div>

                {/* {isLoggedIn ? (
                    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-neutral-200 bg-[#f9fafb] p-3 text-center">
                                <p className="text-2xl font-bold text-neutral-600">পণ্য</p>
                                <p className="mt-2 text-3xl font-bold text-neutral-900">{stats.items}</p>
                            </div>
                            <div className="rounded-xl border border-neutral-200 bg-[#f9fafb] p-3 text-center">
                                <p className="text-2xl font-bold text-neutral-600">বাজার</p>
                                <p className="mt-2 text-3xl font-bold text-neutral-900">{stats.markets}</p>
                            </div>
                            <div className="rounded-xl border border-neutral-200 bg-[#f9fafb] p-3 text-center">
                                <p className="text-2xl font-bold text-neutral-600">বিভাগ</p>
                                <p className="mt-2 text-3xl font-bold text-neutral-900">{stats.divisions}</p>
                            </div>
                        </div>
                    </div>
                ) : ( */}
                    <div className="w-full max-w-md">
                        <Image src="/bazar-hero.png" alt="banner" width={400} height={300} className="h-auto w-full" />
                    </div>
                {/* )} */}
            </div>
        </div>
    );
};

export default Banner;