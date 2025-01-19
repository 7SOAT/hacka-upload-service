export interface SqsClientProviderPort {
  sendMessage(): Promise<void>;
}
