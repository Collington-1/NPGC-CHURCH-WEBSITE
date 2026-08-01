"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import { contactSchema, type ContactValues } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
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
          Message sent!
        </p>
        <p className="text-sm text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input id="name" placeholder="Jane Doe" {...register("name")} />
        {errors.name && <FieldError>{errors.name.message}</FieldError>}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
          <Input id="phone" placeholder="+234..." {...register("phone")} />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          rows={5}
          placeholder="How can we help?"
          {...register("message")}
        />
        {errors.message && <FieldError>{errors.message.message}</FieldError>}
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
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
      </Button>
    </form>
  );
}
