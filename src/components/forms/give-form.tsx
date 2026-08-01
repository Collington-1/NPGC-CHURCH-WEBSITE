"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import {
  giveConfirmationSchema,
  givingPurposes,
  type GiveConfirmationValues,
} from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GiveForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GiveConfirmationValues>({
    resolver: zodResolver(giveConfirmationSchema),
  });

  async function onSubmit(values: GiveConfirmationValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/give", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold-500" />
        <p className="font-display text-lg font-bold text-foreground">
          Thank you for sowing!
        </p>
        <p className="text-sm text-muted-foreground">
          We&apos;ve received your giving confirmation. God bless you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field>
        <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
        <Input id="fullName" {...register("fullName")} />
        {errors.fullName && <FieldError>{errors.fullName.message}</FieldError>}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input id="phone" {...register("phone")} />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="amount">Amount</FieldLabel>
          <Input id="amount" placeholder="₦" {...register("amount")} />
          {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="purpose">Purpose</FieldLabel>
          <Controller
            control={control}
            name="purpose"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="purpose" className="w-full">
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
      </div>

      <Field>
        <FieldLabel htmlFor="reference">Transaction Reference (optional)</FieldLabel>
        <Input id="reference" {...register("reference")} />
      </Field>

      <Field>
        <FieldLabel htmlFor="message">Message (optional)</FieldLabel>
        <Textarea id="message" rows={3} {...register("message")} />
      </Field>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold-500 font-semibold text-primary-foreground hover:bg-gold-400 sm:w-auto"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Giving"}
      </Button>
    </form>
  );
}
