export interface DynamoDbClientProviderPort {
  saveDocument(item: object): Promise<void>;
  getDocument(): Promise<void>;
}
