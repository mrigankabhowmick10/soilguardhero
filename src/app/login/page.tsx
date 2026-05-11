"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/dashboard",
            });
            if (res?.error) setError("Invalid email or password");
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-6">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl"
            >
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="SoilGuard" className="w-16 h-16" />
                </div>

                <h2 className="text-2xl font-black text-center text-slate-900 mb-1">Welcome back</h2>
                <p className="text-center text-slate-500 text-sm mb-8">Access your smart farm dashboard</p>

                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@soilguard.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span></div>
                </div>

                <button
                    onClick={() => {
                        // Guaranteed demo login for the Google button
                        signIn("credentials", {
                            email: "admin@soilguard.com",
                            password: "admin123",
                            callbackUrl: "/dashboard",
                        });
                    }}
                    className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-3 h-12 mb-4 shadow-sm"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.61z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Google
                </button>

                <p className="text-center text-xs text-slate-400 mt-4">
                    Need help? Contact <Link href="/contact" className="text-green-600 font-bold hover:underline">Support</Link>
                </p>
            </motion.div>

            <div className="mt-8 text-center text-slate-500 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Secured by SoilGuard Authentication
            </div>
        </div>
    );
}
