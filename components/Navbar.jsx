"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-black fixed p-4">
      <div className="container mx-auto">
        <ul className="flex justify-betwee h-screen flex-col">
          <div className="one">
            <li className="mx-4 mt-5">
              <Link href="/" className="text-white font-bold">
                Home
              </Link>
            </li>
            <li className="mx-4 mt-5">
              <Link href="/dashboard" className="text-white font-bold">
                Dashboard
              </Link>
            </li>

            <>
              <div className="auth">
                {!session ? (
                  <>
                    <li className="mx-4 mt-5">
                      <Link href="/login" className="text-white font-bold">
                        Login
                      </Link>
                    </li>
                    <li className="mx-4 mb-[2rem]">
                      <Link href="/register" className="text-white font-bold">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <p>{session?.user?.email}</p>
                    <li>
                        <button onClick={signOut}>
                            Sign out
                        </button>
                    </li>
                  </>
                )}
              </div>
            </>
          </div>
        </ul>
      </div>
    </nav>
  );
}
