"use client";

import { useState } from "react";
import Script from "next/script";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";

import {
  cardGiveSchema,
  givingCurrencies,
  givingPurposes,
  type CardGiveValues,
} from "@/lib/validations";
import type { FlutterwaveCheckoutOptions } from "@/lib/flutterwave";
import { siteConfig } from "@/lib/site-config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencyLabels: Record<(typeof givingCurrencies)[number], string> = {
  NGN: "Naira (₦)",
  USD: "Dollar ($)",
  GBP: "Pounds (£)",
  EUR: "Euro (€)",
};

export function CardGiveForm({ publicKey }: { publicKey: string }) {
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">(
    "idle"
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CardGiveValues>({
    resolver: zodResolver(cardGiveSchema),
    defaultValues: { currency: "NGN" },
  });

  async function onSubmit(values: CardGiveValues) {
    if (!scriptReady || !window.FlutterwaveCheckout) {
      setStatus("error");
      return;
    }

    setStatus("processing");
    const tx_ref = `npgc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const options: FlutterwaveCheckoutOptions = {
      public_key: publicKey,
      tx_ref,
      amount: Number(values.amount),
      currency: values.currency,
      payment_options: "card",
      customer: {
        email: values.email,
        phone_number: values.phone,
        name: values.fullName,
      },
      customizations: {
        title: "Give to NPGC",
        description: values.purpose,
      },
      callback: async (response) => {
        if (response.status !== "successful") {
          setStatus("error");
          return;
        }
        try {
          const res = await fetch("/api/give/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transaction_id: String(response.transaction_id),
              tx_ref: response.tx_ref,
              ...values,
            }),
          });
          setStatus(res.ok ? "success" : "error");
        } catch {
          setStatus("error");
        }
      },
      onclose: () => {
        setStatus((s) => (s === "processing" ? "idle" : s));
      },
    };

    window.FlutterwaveCheckout(options);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold-500" />
        <p className="font-display text-lg font-bold text-foreground">
          Thank you for sowing!
        </p>
        <p className="text-sm text-muted-foreground">
          Your card payment was received. God bless you.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        onReady={() => setScriptReady(true)}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Field>
          <FieldLabel htmlFor="card-fullName">Full Name</FieldLabel>
          <Input id="card-fullName" {...register("fullName")} />
          {errors.fullName && <FieldError>{errors.fullName.message}</FieldError>}
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="card-email">Email</FieldLabel>
            <Input id="card-email" type="email" {...register("email")} />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="card-phone">Phone</FieldLabel>
            <Input id="card-phone" {...register("phone")} />
            {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
          <Field>
            <FieldLabel htmlFor="card-amount">Amount</FieldLabel>
            <Input id="card-amount" type="number" min="1" step="0.01" {...register("amount")} />
            {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="card-currency">Currency</FieldLabel>
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="card-currency" className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {givingCurrencies.map((c) => (
                      <SelectItem key={c} value={c}>
                        {currencyLabels[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="card-purpose">Purpose</FieldLabel>
          <Controller
            control={control}
            name="purpose"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="card-purpose" className="w-full">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {givingPurposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.purpose && <FieldError>{errors.purpose.message}</FieldError>}
        </Field>

        {status === "error" && (
          <p className="text-sm text-destructive">
            Something went wrong with your payment. Please try again, or use{" "}
            {siteConfig.whatsapp ? "WhatsApp" : "the bank details"} to reach us if it
            persists.
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "processing"}
          className="w-full bg-gold-500 font-semibold text-primary-foreground hover:bg-gold-400 sm:w-auto"
        >
          {status === "processing" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" /> Pay with Card
            </>
          )}
        </Button>
      </form>
    </>
  );
}
