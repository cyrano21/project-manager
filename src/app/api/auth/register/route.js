import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Tous les champs sont requis" },
      { status: 400 }
    );
  }

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "L'utilisateur existe déjà" },
      { status: 400 }
    );
  }

  // Chiffrer le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return NextResponse.json({ user });
}
