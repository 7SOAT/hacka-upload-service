export interface SqsClientProviderPort {
  sendMessage(message: object): Promise<void>;
}
