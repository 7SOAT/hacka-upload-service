export interface SqsClientRepositoryPort {
  sendMessage(message: object): Promise<void>;
}
