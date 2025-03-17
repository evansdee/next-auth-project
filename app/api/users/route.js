import connectToDb from "@/config/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDb();

    const users = await User.find();

    return new NextResponse(JSON.stringify({ users }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(
        JSON.stringify({ message: `Server Error ${err}` }),
        { status: 500 } // ✅ Correct usage
      );
  }
}
