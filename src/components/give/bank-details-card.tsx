"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type CurrencyLine = { currency: string; number: string };

type Account = {
  bankName: string;
  accountName: string;
  usedFor: string;
  lines: CurrencyLine[];
};

const accounts: Account[] = [
  {
    bankName: "First Bank Nigeria",
    accountName: "The New Paradigm Global Church",
    usedFor: "Tithe, Offering, Mission Support & Special Seed",
    lines: [{ currency: "Naira", number: "2043918883" }],
  },
  {
    bankName: "UBA",
    accountName: "The New Paradigm Global Church Project Account",
    usedFor: "Project Giving & Building Fund only",
    lines: [
      { currency: "Naira", number: "1028620504" },
      { currency: "Dollar", number: "3004919446" },
      { currency: "Euro", number: "3004919350" },
      { currency: "Pounds", number: "3004919398" },
    ],
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
          key={account.bankName}
          className="rounded-2xl border border-border/60 bg-card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">
              {account.bankName}
            </p>
            <p className="text-xs text-muted-foreground">{account.usedFor}</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{account.accountName}</p>

          <div className="mt-4 space-y-3">
            {account.lines.map((line) => (
              <div
                key={line.currency}
                className="flex items-center justify-between gap-3 border-t border-border/40 pt-3 first:border-t-0 first:pt-0"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {line.currency}
                  </p>
                  <p className="font-display text-xl font-bold tracking-wide text-foreground">
                    {line.number}
                  </p>
                </div>
                <button
                  onClick={() => copy(line.number)}
                  aria-label={`Copy ${line.currency} account number`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  {copied === line.number ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
