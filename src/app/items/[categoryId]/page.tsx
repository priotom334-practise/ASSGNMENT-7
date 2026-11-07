import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SortSelector from "./SortSelector";

interface Product {
    id: number;
    nameBn: string;
    slug: string;
    icon: string;
}

const CategoryItems = async ({
    params,
    searchParams,
}: {
    params: Promise<{ categoryId: string }>;
    searchParams: Promise<{ sort?: string | string[] }>;
}) => {
    const { categoryId } = await params;
    const { sort } = await searchParams;
    const sortOrder = sort === "high-to-low" ? "high-to-low" : "low-to-high";

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
    );

    const data1 = await res.json();

    if (!data1) {
        notFound();
    }

    const res2 = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data2 = await res2.json();
    const categoryExists = data2.some((category: Product) => category.slug === categoryId);

    if (!categoryExists) {
        notFound();
    }

    const sortedProducts = [...data1].sort((a: { today: number }, b: { today: number }) =>
        sortOrder === "high-to-low" ? b.today - a.today : a.today - b.today,
    );

    return (
        <div className="container mx-auto flex flex-col gap-6 px-4 py-6 md:px-8">
            <section className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl" aria-hidden="true">
                    {data2.find((category: Product) => category.slug === categoryId)?.icon}
                </span>
                <div>
                    <h1 className="text-xl font-bold text-neutral-900">
                        {data2.find((category: Product) => category.slug === categoryId)?.nameBn}
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        {data1.filter((product: { change: { pct: number } }) => product.change.pct !== 0).length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>

            <section className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3">
                <p className="text-sm text-neutral-600">মোট {data1.length.toLocaleString("bn-BD")}টি পণ্য</p>
                <Suspense fallback={<div className="text-sm text-neutral-500">সাজানো হচ্ছে...</div>}>
                    <SortSelector categoryId={categoryId} currentSort={sortOrder} />
                </Suspense>
            </section>

            {data1.length === 0 ? (
                <p className="py-8 text-center text-neutral-600">এই বিভাগে কোনো পণ্য পাওয়া যায়নি।</p>
            ) : (
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product: {
                        id: number;
                        nameBn: string;
                        image: string;
                        today: number;
                        yesterday: number;
                        unit: string;
                        change: { dir: string; pct: number };
                    }) => (
                        <Link key={product.id} href={`/Categories/${product.id}`} className="block">
                            <article className="rounded-lg border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-xl" aria-hidden="true">
                                        {product.image}
                                    </span>
                                    <div>
                                        <h2 className="font-semibold text-neutral-900">{product.nameBn}</h2>
                                        <p className="text-xs text-neutral-500">প্রতি {product.unit}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-end justify-between border-t border-neutral-100 pt-3">
                                    <div>
                                        <p className="text-xs text-neutral-500">আজকের দাম</p>
                                        <p className="font-bold text-neutral-900">{product.today} টাকা</p>
                                        <p className="mt-1 text-xs text-neutral-500">গতকাল {product.yesterday} টাকা</p>
                                    </div>
                                    <span className={`rounded px-2 py-1 text-xs font-semibold ${product.change.dir === "up" ? "bg-red-50 text-red-700" : product.change.dir === "down" ? "bg-green-50 text-green-700" : "bg-neutral-100 text-neutral-600"}`}>
                                        {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "−"} {product.change.pct}%
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </section>
            )}
        </div>
    );
};

export default function CategoryItemsPage(props: {
    params: Promise<{ categoryId: string }>;
    searchParams: Promise<{ sort?: string | string[] }>;
}) {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 py-6 md:px-8">
                    <p className="text-neutral-600">পণ্যের তথ্য লোড হচ্ছে...</p>
                </div>
            }
        >
            <CategoryItems {...props} />
        </Suspense>
    );
}