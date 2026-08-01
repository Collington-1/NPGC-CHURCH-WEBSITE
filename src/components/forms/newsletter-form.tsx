"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
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
      <p className="mt-4 flex items-center gap-2 text-sm text-gold-400">
        <Check className="h-4 w-4" /> You&apos;re subscribed. Welcome home.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@example.com"
          className="border-border/70 bg-white/5 text-foreground placeholder:text-muted-foreground"
          {...register("email")}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 bg-gold-500 font-semibold text-primary-foreground hover:bg-gold-400"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
        </Button>
      </div>
      {errors.email && (
        <p className="mt-2 text-xs text-destructive">{errors.email.message}</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
