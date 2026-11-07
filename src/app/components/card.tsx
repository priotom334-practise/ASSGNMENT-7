import Link from "next/link";
import { Suspense } from "react";

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
    }
}


const CardContent = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    return (
        <>
            <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col gap-6">
                <div>
                    <h2 className="font-bold text-2xl"><span className="text-red-600">▲</span> আজ দাম বেড়েছে</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.filter((h: Product) => h.today - h.yesterday > 0)
                        .sort((a: Product, b: Product) => b.change.pct - a.change.pct).slice(0, 6)
                        .map((h: Product) => (
                            <Link key={h.id} href={`/categories/${h.id}`} className="">
                                <div className=" border border-gray-200 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">

                                    <div className="flex item-center gap-2 mb-2">
                                        <div>
                                            {h.image}
                                        </div>
                                        <div>
                                            <p>{h.nameBn}</p>
                                            <span>
                                                {(h.unit === "kg" ? "প্রতি কেজি" : h.unit === "piece" ? "প্রতি পিস" : h.unit === "dozen" ? "প্রতি ডজন" : h.unit === "litre" ? "প্রতি লিটার" : "")}
                                            </span>
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p>আজকের দাম</p>
                                            <p>{h.today} টাকা/{(h.unit === "kg" ? "প্রতি কেজি" : h.unit === "piece" ? "প্রতি পিস" : h.unit === "dozen" ? "প্রতি ডজন" : h.unit === "litre" ? "প্রতি লিটার" : "")}</p>
                                        </div>
                                        <span className="2 text-red-600">
                                            ▲ {h.change.pct}%
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>

            </div>

            <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col gap-6">
                <div>
                    <h2 className="font-bold text-2xl"><span className="text-green-600">▼</span> আজ দাম কমেছে</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.filter((h: Product) => h.today - h.yesterday < 0)
                        .sort((a: Product, b: Product) => b.change.pct - a.change.pct).slice(0, 6)
                        .map((h: Product) => (
                            <Link key={h.id} href={`/categories/${h.id}`} className="">
                                <div className=" border border-gray-200 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">

                                    <div className="flex item-center gap-2 mb-2">
                                        <div>
                                            {h.image}
                                        </div>
                                        <div>
                                            <p>{h.nameBn}</p>
                                            <span>
                                                {(h.unit === "kg" ? "প্রতি কেজি" : h.unit === "piece" ? "প্রতি পিস" : h.unit === "dozen" ? "প্রতি ডজন" : h.unit === "litre" ? "প্রতি লিটার" : "")}
                                            </span>
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p>আজকের দাম</p>
                                            <p>{h.today} টাকা/{(h.unit === "kg" ? "প্রতি কেজি" : h.unit === "piece" ? "প্রতি পিস" : h.unit === "dozen" ? "প্রতি ডজন" : h.unit === "litre" ? "প্রতি লিটার" : "")}</p>
                                        </div>
                                        <span className="2 text-green-600">
                                            ▼ {h.change.pct}%
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>

            </div>

            <div id="all-products" className="container mx-auto px-4 md:px-8 py-4 flex flex-col gap-6 scroll-mt-24">
                <div>
                    <h2 className="font-bold text-2xl">সব পণ্য</h2>
                    <p className="">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((h: Product) => (
                        <Link key={h.id} href={`/categories/${h.id}`} className="">
                            <div className=" border border-gray-200 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">

                                <div className="flex item-center gap-2 mb-2">
                                    <div>
                                        {h.image}
                                    </div>
                                    <div>
                                        <p>{h.nameBn}</p>
                                        <span>
                                            {(h.unit === "kg" ? "প্রতি কেজি" : h.unit === "piece" ? "প্রতি পিস" : h.unit === "dozen" ? "প্রতি ডজন" : h.unit === "litre" ? "প্রতি লিটার" : "")}
                                        </span>
                                    </div>
                                </div>


                                <div className="flex justify-between items-center">
                                    <div>
                                        <p>আজকের দাম</p>
                                            <p>{h.today} টাকা/{(h.unit === "kg" ? "প্রতি কেজি" : h.unit === "piece" ? "প্রতি পিস" : h.unit === "dozen" ? "প্রতি ডজন" : h.unit === "litre" ? "প্রতি লিটার" : "")}</p>
                                    </div>
                                    {h.change.dir === "up" ? <span className="2 text-red-600">
                                        ▲ {h.change.pct}%
                                    </span> : <span className="2 text-green-600">
                                        ▼ {h.change.pct}%
                                    </span>}

                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </>
    );
};

const Card = () => (
    <Suspense
        fallback={
            <div className="container mx-auto px-4 md:px-8 py-4">
                <p>দামের তথ্য লোড হচ্ছে...</p>
            </div>
        }
    >
        <CardContent />
    </Suspense>
);

export default Card;