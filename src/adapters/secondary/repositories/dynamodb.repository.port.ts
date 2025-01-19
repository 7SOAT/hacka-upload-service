export interface DynamoDbClientRepositoryPort {
  save(item: object): Promise<void>;
  get(): Promise<void>;
}
