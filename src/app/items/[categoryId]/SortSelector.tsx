"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";

export default function SortSelector({
    categoryId,
    currentSort,
}: {
    categoryId: string;
    currentSort: "low-to-high" | "high-to-low";
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        const value = event.target.value as "low-to-high" | "high-to-low";

        if (value === "low-to-high") {
            nextParams.delete("sort");
        } else {
            nextParams.set("sort", value);
        }

        const queryString = nextParams.toString();
        const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(nextUrl, { scroll: false });
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor={`sort-${categoryId}`} className="text-sm text-neutral-600">
                দাম
            </label>
            <select
                id={`sort-${categoryId}`}
                value={currentSort}
                onChange={handleSortChange}
                className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-green-600"
            >
                <option value="low-to-high">কম থেকে বেশি</option>
                <option value="high-to-low">বেশি থেকে কম</option>
            </select>
        </div>
    );
}