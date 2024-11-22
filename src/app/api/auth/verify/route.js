import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token requis" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ valid: true, decoded });
  } catch (err) {
    return NextResponse.json({ valid: false, error: "Token invalide" }, { status: 401 });
  }
}
