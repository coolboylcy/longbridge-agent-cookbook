import type { LongbridgeClientConfig, Quote, Position, Order } from "./types";

export class LongbridgeClient {
  private readonly token: string;
  private readonly baseUrl: string;
  private readonly tradingMode: "paper" | "live";

  constructor(config: LongbridgeClientConfig) {
    if (!config.token) throw new Error("Longbridge token is required");

    const mode = config.tradingMode ?? "paper";
    if (mode !== "paper") {
      throw new Error(
        "Non-paper trading mode is not allowed in this cookbook. Set tradingMode to 'paper'."
      );
    }

    this.token = config.token;
    this.tradingMode = mode;
    this.baseUrl = config.baseUrl ?? "https://openapi.longbridgeapp.com";
  }

  private async fetch<T>(path: string): Promise<T> {
    const res = await globalThis.fetch(`${this.baseUrl}${path}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) {
      throw new Error(`Longbridge API error ${res.status}: ${await res.text()}`);
    }
    return res.json() as Promise<T>;
  }

  async getQuote(symbol: string): Promise<Quote> {
    return this.fetch<Quote>(`/v1/quote/intraday?symbol=${encodeURIComponent(symbol)}`);
  }

  async getPositions(): Promise<Position[]> {
    return this.fetch<Position[]>("/v1/asset/stock");
  }

  async getOrders(): Promise<Order[]> {
    return this.fetch<Order[]>("/v1/trade/order/today");
  }
}

export function createLongbridgeClient(config: LongbridgeClientConfig) {
  return new LongbridgeClient(config);
}
