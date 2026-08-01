export type FlutterwaveCheckoutOptions = {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: { email: string; phone_number: string; name: string };
  customizations: { title: string; description: string; logo?: string };
  callback: (response: { status: string; transaction_id: string | number; tx_ref: string }) => void;
  onclose: () => void;
};

declare global {
  interface Window {
    FlutterwaveCheckout?: (options: FlutterwaveCheckoutOptions) => void;
  }
}
