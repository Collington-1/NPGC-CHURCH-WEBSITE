"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import {
  eventRegistrationSchema,
  type EventRegistrationValues,
} from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export function EventRegistrationForm({ eventId }: { eventId: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventRegistrationValues>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: { eventId },
  });

  async function onSubmit(values: EventRegistrationValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/event-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ eventId });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold-500" />
        <p className="font-display text-lg font-bold text-foreground">
          You&apos;re registered!
        </p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll be in touch with more details ahead of the program.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" {...register("eventId")} value={eventId} />
      <Field>
        <FieldLabel htmlFor="ev-fullName">Full Name</FieldLabel>
        <Input id="ev-fullName" {...register("fullName")} />
        {errors.fullName && <FieldError>{errors.fullName.message}</FieldError>}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="ev-phone">Phone</FieldLabel>
          <Input id="ev-phone" {...register("phone")} />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="ev-email">Email</FieldLabel>
          <Input id="ev-email" type="email" {...register("email")} />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="ev-message">Anything we should know? (optional)</FieldLabel>
        <Textarea id="ev-message" rows={3} {...register("message")} />
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
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register Now"}
      </Button>
    </form>
  );
}
