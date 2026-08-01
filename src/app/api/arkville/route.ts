import { NextResponse } from "next/server";

import { getWriteClient } from "@/sanity/lib/write-client";
import { arkvilleRegistrationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = arkvilleRegistrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await getWriteClient().create({
      _type: "arkvilleRegistration",
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("arkville registration failed", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
