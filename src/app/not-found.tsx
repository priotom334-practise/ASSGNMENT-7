import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
                    ⚠️
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-red-600">
                    404 Error
                </p>

                <h1 className="text-3xl font-bold text-neutral-900">পেজটি খুঁজে পাওয়া যায়নি</h1>
                <p className="mt-3 text-base text-neutral-600">
                    এটি ভুল বিভাগ, ভুল পণ্য, অথবা অবৈধ রাউট হতে পারে। অনুগ্রহ করে হোমপেজে ফিরে যান।
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                        হোমপেজে যান
                    </Link>
                    
                </div>
            </div>
        </main>
    );
}