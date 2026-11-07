
import Link from "next/link";
// import { headers } from "next/headers";
import { notFound, /*redirect*/ } from "next/navigation";
import { Suspense } from "react";
// import { auth } from "@/app/lib/auth";

interface Product {
    id: number;
    nameBn: string;
    today: number;
    yesterday: number;
    image: string;
    unit: string;
    change: {
        dir: string;
        pct: number;
    };
    markets: MarketPrice[];
}

interface MarketPrice {
    market: string;
    division: string;
    min: number;
    max: number;
}

const unitNames: Record<string, string> = {
    kg: "কেজি",
    piece: "পিস",
    dozen: "ডজন",
    litre: "লিটার",
};

async function ProductDetailsContent({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // const session = await auth.api.getSession({
    //     headers: await headers(),
    // });

    // if (!session) {
    //     redirect("/signin");
    // }

    const { id } = await params;
    const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

    if (!response.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি");
    }

    const products: Product[] = await response.json();
    const product = products.find((item) => item.id === Number(id));

    if (!product) {
        notFound();
    }

    const unit = unitNames[product.unit] ?? product.unit;
    const highestMarket = product.markets.reduce((highest, market) =>
        market.max > highest.max ? market : highest,
    );
    const lowestMarket = product.markets.reduce((lowest, market) =>
        market.min < lowest.min ? market : lowest,
    );
    const marketPriceDifference = highestMarket.max - lowestMarket.min;
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";
    const changeColor = isUp ? "text-red-700" : isDown ? "text-green-700" : "text-neutral-600";
    const changeBg = isUp ? "bg-red-50" : isDown ? "bg-green-50" : "bg-neutral-50";

    return (
        <main className="container mx-auto max-w-5xl px-4 py-6 md:px-8">
            <Link href="/" className="text-sm text-neutral-600 hover:text-green-700">
                ← সব পণ্যে ফিরে যান
            </Link>

            <section className="mt-4 flex flex-col justify-between gap-5 rounded-xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center md:p-7">
                <div className="flex items-center gap-4">
                    <span
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-green-50 text-4xl"
                        aria-hidden="true"
                    >
                        {product.image}
                    </span>
                    <div>
                        <p className="text-sm text-neutral-500">পণ্যের বিস্তারিত</p>
                        <h1 className="mt-1 text-2xl font-bold text-neutral-900">{product.nameBn}</h1>
                        <p className="mt-1 text-sm text-neutral-600">প্রতি {unit}</p>
                    </div>
                </div>

                <div className={`min-w-32 rounded-lg ${changeBg} px-4 py-3 sm:text-right`}>
                    <p className="text-xs text-neutral-600">আজকের দাম</p>
                    <p className="text-xl font-bold text-neutral-900">{product.today} টাকা</p>
                    <p className={`mt-1 text-sm font-semibold ${changeColor}`}>
                        {isUp ? "▲" : isDown ? "▼" : "−"} {product.change.pct}%
                    </p>
                </div>
            </section>

            <section className="mt-5">
                <h2 className="mb-3 text-lg font-bold text-neutral-900">দামের সারাংশ</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <article className="rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-sm text-neutral-600">সর্বোচ্চ দাম</p>
                        <p className="mt-2 text-xl font-bold text-neutral-900">
                            {highestMarket.max.toLocaleString("bn-BD")} টাকা
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">প্রতি {unit} <br/>{highestMarket.market} </p>
                    </article>

                    <article className="rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-sm text-neutral-600">সর্বনিম্ন দাম</p>
                        <p className="mt-2 text-xl font-bold text-neutral-900">
                            {lowestMarket.min.toLocaleString("bn-BD")} টাকা
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">প্রতি {unit} <br/> {lowestMarket.market} </p>
                    </article>

                    <article className="rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-sm text-neutral-600">দামের পার্থক্য</p>
                        <p className="mt-2 text-xl font-bold text-neutral-900">
                            {marketPriceDifference.toLocaleString("bn-BD")} টাকা
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">সর্বোচ্চ ও সর্বনিম্ন দামের ব্যবধান</p>
                    </article>
                </div>
            </section>

            <section className="mt-5 rounded-xl border border-neutral-200 bg-white p-4 md:p-5">
                <h2 className="mb-4 text-lg font-bold text-neutral-900">বাজারভিত্তিক আজকের দাম</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-160 border-collapse text-sm">
                        <thead>
                            <tr className="bg-neutral-50 text-left text-neutral-600">
                                <th scope="col" className="border border-neutral-200 px-3 py-2">বাজার</th>
                                <th scope="col" className="border border-neutral-200 px-3 py-2">বিভাগ</th>
                                <th scope="col" className="border border-neutral-200 px-3 py-2 text-right">সর্বনিম্ন</th>
                                <th scope="col" className="border border-neutral-200 px-3 py-2 text-right">সর্বাধিক</th>
                                <th scope="col" className="border border-neutral-200 px-3 py-2 text-right">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.markets.map((market) => (
                                <tr key={`${market.market}-${market.division}`} className="odd:bg-white even:bg-neutral-50">
                                    <th scope="row" className="border border-neutral-200 px-3 py-2 text-left font-medium text-neutral-900">
                                        {market.market}
                                    </th>
                                    <td className="border border-neutral-200 px-3 py-2 text-neutral-700">{market.division}</td>
                                    <td className="border border-neutral-200 px-3 py-2 text-right text-neutral-700">
                                        {market.min.toLocaleString("bn-BD")} টাকা
                                    </td>
                                    <td className="border border-neutral-200 px-3 py-2 text-right text-neutral-700">
                                        {market.max.toLocaleString("bn-BD")} টাকা
                                    </td>
                                    <td className="border border-neutral-200 px-3 py-2 text-right font-semibold text-neutral-900">
                                        {((market.min + market.max) / 2).toLocaleString("bn-BD", { maximumFractionDigits: 1 })} টাকা
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense
            fallback={
                <main className="container mx-auto max-w-5xl px-4 py-6 md:px-8">
                    <p className="text-neutral-600">পণ্যের তথ্য লোড হচ্ছে...</p>
                </main>
            }
        >
            <ProductDetailsContent params={params} />
        </Suspense>
    );
}