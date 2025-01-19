export interface SqsClientRepositoryPort {
  sendMessage(): Promise<void>;
}
