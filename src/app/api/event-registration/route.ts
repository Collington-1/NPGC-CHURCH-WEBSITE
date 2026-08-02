import { NextResponse } from "next/server";

import { getWriteClient } from "@/sanity/lib/write-client";
import { eventRegistrationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = eventRegistrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { eventId, ...rest } = parsed.data;

  try {
    await getWriteClient().create({
      _type: "eventRegistration",
      event: { _type: "reference", _ref: eventId },
      ...rest,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("event registration failed", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
