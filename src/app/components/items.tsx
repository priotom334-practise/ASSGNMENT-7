import Link from "next/link";



interface Navs {
    slug: string;
    nameBn: string;
    icon: string;
    id: string;
}


const items = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();

    return (
        <div className="mt-2 flex flex-wrap items-center justify-start gap-x-5 gap-y-1 md:-mx-4">

            {data.map((n: Navs) => (
                <div key={n.slug} >
                    <div className="flex items-center text-sm font-semibold text-neutral-700 transition-colors hover:text-red-700">
                        <Link href={`/Items/${n.slug}`} className="flex items-center">
                            <span className="text-[15px] leading-none flex h-10 w-10 items-center justify-center">
                                {n.icon}
                            </span>
                            {n.nameBn}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default items;