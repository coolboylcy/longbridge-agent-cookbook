export interface Quote {
  symbol: string;
  lastDone: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  turnover: number;
  tradeStatus: "Normal" | "Halted" | "DelayTrade" | "CallAuction";
}

export interface Position {
  symbol: string;
  symbolName: string;
  quantity: number;
  availableQuantity: number;
  currency: string;
  costPrice: number;
  marketValue: number;
  unrealizedPnl: number;
  unrealizedPnlRatio: number;
}

export interface Order {
  orderId: string;
  symbol: string;
  side: "Buy" | "Sell";
  orderType: "LO" | "ELO" | "MO" | "AO" | "ALO";
  quantity: number;
  executedQuantity: number;
  price?: number;
  status: "NotReported" | "ReplacedNotReported" | "ProtectedNotReported" | "VarietiesNotReported" | "Filled" | "WaitToNew" | "New" | "WaitToReplace" | "PendingReplace" | "Replaced" | "PartialFilled" | "WaitToCancel" | "PendingCancel" | "Rejected" | "Canceled" | "ExpiredStatus" | "PartialWithdrawal";
  submittedAt: string;
}

export interface LongbridgeClientConfig {
  token: string;
  baseUrl?: string;
  tradingMode?: "paper" | "live";
}
