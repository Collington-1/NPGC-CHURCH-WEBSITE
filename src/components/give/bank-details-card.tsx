"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// TODO: replace with the church's real account details.
const accounts = [
  {
    bankName: "[Placeholder Bank Name]",
    accountName: "The New Paradigm Global Church",
    accountNumber: "0000000000",
  },
];

export function BankDetailsCard() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(value: string) {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <div
          key={account.accountNumber}
          className="rounded-2xl border border-border/60 bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">
              {account.bankName}
            </p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{account.accountName}</p>
          <div className="mt-2 flex items-center gap-3">
            <p className="font-display text-2xl font-bold tracking-wide text-foreground">
              {account.accountNumber}
            </p>
            <button
              onClick={() => copy(account.accountNumber)}
              aria-label="Copy account number"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-gold-500 hover:text-gold-400"
            >
              {copied === account.accountNumber ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
