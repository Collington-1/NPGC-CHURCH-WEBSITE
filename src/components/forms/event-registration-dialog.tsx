"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";

export function EventRegistrationDialog({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gold-500 font-semibold text-primary-foreground hover:bg-gold-400">
          Register Now
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-background sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            Register: {eventTitle}
          </DialogTitle>
        </DialogHeader>
        <EventRegistrationForm eventId={eventId} />
      </DialogContent>
    </Dialog>
  );
}
