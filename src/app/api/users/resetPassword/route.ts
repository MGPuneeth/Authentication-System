import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // console.log("Req Body:", reqBody);
    const { email } = reqBody;

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    await sendEmail({
      email: email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      status: 200,
      message: "Verification token sent throung mail successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
