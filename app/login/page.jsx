"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

//   console.log(session, status);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
        toast.error("Please fill all the input fields");
        return;
    }

    try {
        const res = await signIn('credentials', {
            redirect: false, // Prevents automatic redirection
            email,
            password,
        });

        if (res?.error) {
            if(res?.url){
                router.replace("/dashboard")
            }

            toast.error("Invalid Credentials",res.error)
        } else {
            toast.success("Login Successfully");
        }
    } catch (error) {
        toast.error("An error occurred during login");
        console.error(error);
    }
};
  return (
    status !== "authenticated" && (
      <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="bg-white p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-semibold mb-4">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-5">Login</button>

      <div className="mt-4 text-center">
      <p className="text-gray-600">Don't have an account? <Link href="/register" className="text-blue-500 hover:text-blue-600">Sign up</Link></p>
    </div>
    </form>
  </div>
</div>
      </>
    )
  );
}
