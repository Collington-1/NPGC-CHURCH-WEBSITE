import { NextResponse } from "next/server";

import { getWriteClient } from "@/sanity/lib/write-client";
import { cardGiveVerifySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = cardGiveVerifySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Card giving is not configured yet." },
      { status: 503 }
    );
  }

  const { transaction_id, tx_ref, ...data } = parsed.data;

  try {
    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );
    const verifyJson = await verifyRes.json();
    const txn = verifyJson?.data;

    const isValid =
      verifyJson?.status === "success" &&
      txn?.status === "successful" &&
      txn?.tx_ref === tx_ref &&
      txn?.currency === data.currency &&
      Number(txn?.amount) >= data.amount;

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment could not be verified." },
        { status: 402 }
      );
    }

    await getWriteClient().create({
      _type: "giveConfirmation",
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      amount: String(data.amount),
      currency: data.currency,
      purpose: data.purpose,
      method: "Card",
      flwTransactionId: String(transaction_id),
      flwTxRef: tx_ref,
      verified: true,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("give card verification failed", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
