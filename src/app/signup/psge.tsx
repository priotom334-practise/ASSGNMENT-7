"use client";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as
            { name: string; email: string; password: string; confirmPassword: string };

        if (user.password !== user.confirmPassword) {
            toast.error("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড একই নয়।");
            return;
        }
        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            console.log(data);
            router.replace("/");
        }

        if (error) {
            console.log(error);
        }
    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });

    };

    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    }

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-[#f5f5f5] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-[#dfe7df] bg-white p-6 shadow-sm sm:p-8">
                <h1 className="mb-6 text-center text-2xl font-bold text-[#111827]">অ্যাকাউন্ট তৈরি</h1>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#374151]">
                            নাম
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="আপনার নাম"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#374151]">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="আপনার ইমেইল"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
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
                            placeholder="পাসওয়ার্ড লিখুন"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#374151]">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="পাসওয়ার্ড আবার লিখুন"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-[#2bc06a] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#22a65a]"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                <div className="mt-5 flex items-center justify-center gap-3 text-xs text-[#6b7280]">
                    <span className="h-px flex-1 bg-[#dfe7df]" />
                    <span>অথবা</span>
                    <span className="h-px flex-1 bg-[#dfe7df]" />
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
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <a href="/signin" className="font-semibold text-[#16a34a] hover:underline">
                        লগইন করুন
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;