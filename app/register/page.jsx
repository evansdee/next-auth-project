"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetUsers, useRegister } from "./useRegister";
import { DevTool } from "@hookform/devtools";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function Register() {
  const { register, handleSubmit, control, reset } = useForm();
  const { mutate, error,isError,isPending,reset:format } = useRegister();
  const {data,isLoading} = useGetUsers()
  const router = useRouter();
  const { data: session, status } = useSession();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  function handleForm(data) {
    // console.log(isError, error?.message, "in");

    // Reset mutation state to clear previous errors
    format();

    // Prevent mutation if there is an existing error
    if (isError) {
        toast.error(error?.message || "An error occurred, please try again.");
        return;
    }

    mutate(data, {
        onSuccess: () => {
            toast.success("User created successfully");
            reset(); // ✅ Resets form fields
            format(); // ✅ Resets mutation state AFTER success
            router.push("/login")
        },
        onError: (err) => {
          reset()
            format(); // ✅ Reset mutation state after error to allow retry
        },
    });
}


  // const isPending = true
  // console.log(isError,error?.message,"out")

if(isLoading) return <p className="text-center">Loading...</p>

console.log(status,"reg")

  return (
    status !== "authenticated" && (
      <>
        <DevTool control={control} placement="top-left" />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>

            <form action="" onSubmit={handleSubmit(handleForm)}>
              <div className="mb-4">
                <div className="mb-4">
                  <label
                    htmlFor=""
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("username")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor=""
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"

                    placeholder="Enter Email"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("email")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor=""
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="pass"

                    placeholder="Enter Password"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("password")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor=""
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpass"
                    placeholder="Enter Confirm Password"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("confirmPassword")}
                  />
                </div>

                <div>
                  <button className="w-full bg-blue-500 text-white p-2 rounded">
                    {isPending ? "Loading..." : "Register"}
                  </button>
                </div>

                <span>
                  Already have an account
                  <Link
                    className="text-center text-blue-500 mt-2"
                    href="/login"
                  >
                    {" "}
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
}
