"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import {
  arkvilleRegistrationSchema,
  type ArkvilleRegistrationValues,
} from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export function ArkvilleForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArkvilleRegistrationValues>({
    resolver: zodResolver(arkvilleRegistrationSchema),
  });

  async function onSubmit(values: ArkvilleRegistrationValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/arkville", {
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
          Registration received!
        </p>
        <p className="text-sm text-muted-foreground">
          We&apos;re excited to welcome your child to Arkville. We&apos;ll be
          in touch with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="childName">Child&apos;s Name</FieldLabel>
          <Input id="childName" {...register("childName")} />
          {errors.childName && <FieldError>{errors.childName.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="childAge">Child&apos;s Age</FieldLabel>
          <Input id="childAge" {...register("childAge")} />
          {errors.childAge && <FieldError>{errors.childAge.message}</FieldError>}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="parentName">Parent / Guardian Name</FieldLabel>
        <Input id="parentName" {...register("parentName")} />
        {errors.parentName && <FieldError>{errors.parentName.message}</FieldError>}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="parentPhone">Phone</FieldLabel>
          <Input id="parentPhone" {...register("parentPhone")} />
          {errors.parentPhone && <FieldError>{errors.parentPhone.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="parentEmail">Email</FieldLabel>
          <Input id="parentEmail" type="email" {...register("parentEmail")} />
          {errors.parentEmail && <FieldError>{errors.parentEmail.message}</FieldError>}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="message">Anything we should know? (optional)</FieldLabel>
        <Textarea id="message" rows={4} {...register("message")} />
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
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register Child"}
      </Button>
    </form>
  );
}
