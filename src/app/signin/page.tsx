"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && session) {
            router.replace("/");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return <div className="flex min-h-[70vh] items-center justify-center">Loading...</div>;
    }

    if (session) {
        return null;
    }

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        console.log(user);

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/",
        });

        if (data) {
            toast.success("Sign In successfull!");
            console.log(data);
        }

        if (error) {
            toast.error("Something went error!");
            console.log(error);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (result?.error) {
                const message = (result.error as { message?: string })?.message || "Social login failed";

                if (message.includes("account_not_linked") || message.includes("already linked") || message.includes("already exists")) {
                    toast.error("এই ইমেইলটি আগে থেকেই অন্য লগইন পদ্ধতিতে ব্যবহৃত হয়েছে। অনুগ্রহ করে ইমেইল/পাসওয়ার্ড দিয়ে লগইন করুন।");
                    return;
                }

                toast.error("সোশ্যাল লগইন করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
                return;
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unknown error";

            if (message.includes("account_not_linked") || message.includes("already linked") || message.includes("already exists")) {
                toast.error("এই ইমেইলটি আগে থেকেই অন্য লগইন পদ্ধতিতে ব্যবহৃত হয়েছে। অনুগ্রহ করে ইমেইল/পাসওয়ার্ড দিয়ে লগইন করুন।");
                return;
            }

            toast.error("সোশ্যাল লগইন করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        }
    };

    const handleGoogleSignIn = async () => {
        await handleSocialSignIn("google");
    };

    const handleGithubSignIn = async () => {
        await handleSocialSignIn("github");
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-[#f3f3f3] px-4 py-10">
            <div className="w-full max-w-lg rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-center text-2xl font-bold text-[#111827]">সাইন ইন</h1>
                <p className="mt-2 mb-5 text-center text-xs text-[#6b7280]">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#374151]">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="আপনার ইমেইল"
                            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#374151]">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="আপনার পাসওয়ার্ড"
                            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#2bc06a] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#22a65a]"
                    >
                        সাইন ইন
                    </button>
                </form>

                <div className="mt-5 flex items-center justify-center gap-3 text-xs text-[#6b7280]">
                    <span className="h-px flex-1 bg-[#e5e7eb]" />
                    <span>অথবা</span>
                    <span className="h-px flex-1 bg-[#e5e7eb]" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#f8d7d5] bg-[#fff5f4] px-3 py-2.5 text-sm font-medium text-[#374151] transition hover:border-[#f0b3af] hover:bg-[#fff0ef]"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.6 14.7 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c6.9 0 11.5-4.8 11.5-11.6 0-.8-.1-1.4-.2-1.9H12Z"/>
                            <path fill="#34A853" d="M3.7 7.4l3.7 2.7c1-1.9 3.1-3.3 5.6-3.3 1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.6 14.7 2.8 12 2.8c-3.8 0-7.1 2.2-8.3 5.6Z"/>
                            <path fill="#FBBC05" d="M3.7 16.6A9.2 9.2 0 0 1 3.3 12c0-.9.2-1.8.5-2.6l3.8 2.8c-.2.6-.3 1.2-.3 1.8 0 .6.1 1.2.3 1.8L3.7 16.6Z"/>
                            <path fill="#4285F4" d="M12 21.2c2.4 0 4.4-.8 5.8-2.1l-2.7-2.3c-.8.6-1.9 1-3.1 1-2.4 0-4.4-1.6-5.1-3.7L.9 12.4A9.2 9.2 0 0 0 12 21.2Z"/>
                        </svg>
                        <span>Google</span>
                    </button>

                    <button
                        onClick={handleGithubSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-2.5 text-sm font-medium text-[#374151] transition hover:border-[#d1d5db] hover:bg-[#eceef1]"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-[#111827]" aria-hidden="true">
                            <path d="M12 .8a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.7.7 2 .9.1-.7.4-1.2.7-1.5-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.5 1.2-3.4-.1-.3-.5-1.7.1-3.3 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6.1 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.6.2 3 .1 3.3.8.9 1.2 2.1 1.2 3.4 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .8Z"/>
                        </svg>
                        <span>GitHub</span>
                    </button>
                </div>

                <p className="mt-5 text-center text-sm text-[#6b7280]">
                    নতুন ব্যবহারকারী?{' '}
                    <a href="/signup" className="font-semibold text-[#16a34a] hover:underline">
                        সাইন আপ করুন
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;