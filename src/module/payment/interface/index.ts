export interface IMPPaymentResponse {
  code?: number;
  message?: string;
  response: {
    imp_uid: string;
    merchant_uid: string;
    pay_method?: PayMethod;
    channel?: string;
    pg_provider: string;
    emb_pg_provider?: string;
    pg_tid?: string;
    pg_id?: string;
    escrow?: boolean;
    apply_num?: string;
    bank_code?: string;
    bank_name?: string;
    card_code?: string;
    card_name?: string;
    card_quota?: number;
    card_number?: string;
    card_type?: null;
    vbank_code?: string;
    vbank_name?: string;
    vbank_num?: string;
    vbank_holder?: string;
    vbank_date?: number;
    vbank_issued_at?: number;
    name?: string;
    amount: number;
    cancel_amount?: number;
    currency?: string;
    buyer_name?: string;
    buyer_email?: string;
    buyer_tel?: string;
    buyer_addr?: string;
    buyer_postcode?: string;
    custom_data?: string;
    user_agent?: string;
    status?: string;
    started_at?: number;
    paid_at?: number;
    failed_at?: number;
    cancelled_at?: number;
    fail_reason?: string;
    cancel_reason?: string;
    receipt_url?: string;
    cancel_history?: [
      {
        pg_tid?: string;
        amount?: number;
        cancelled_at?: number;
        reason?: string;
        receipt_url?: string;
      },
    ];
    cancel_receipt_urls?: [string];
    cash_receipt_issued?: boolean;
    customer_uid?: string;
    customer_uid_usage?: string;
  };
}

export type PayMethod =
  | 'card'
  | 'trans'
  | 'vbank'
  | 'phone'
  | 'samsung'
  | 'kpay'
  | 'kakaopay'
  | 'payco'
  | 'lpay'
  | 'ssgpay'
  | 'tosspay'
  | 'cultureland'
  | 'smartculture'
  | 'happymoney'
  | 'booknlife'
  | 'point'
  | 'wechat'
  | 'alipay'
  | 'unionpay'
  | 'tenpay';
