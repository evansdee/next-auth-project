import { User } from "@/models/User";
import connectToDb from "@/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { username, email, password, confirmPassword } = await req.json();

//   console.log(email,"route")

  if (password !== confirmPassword) {
    return new NextResponse(
      JSON.stringify({ message: "Passwords do not match" }),
      { status: 400 } // ✅ Correct usage
    );
  }
  try {
    await connectToDb();
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return new NextResponse(
        JSON.stringify({ message: "User already exist" }),
        { status: 400 } // ✅ Correct usage
      );

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return new NextResponse(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Server Error" }),
      { status: 500 } // ✅ Correct usage
    );
  }
};
