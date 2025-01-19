import { DynamoDbClientRepositoryPort } from '@adapters/secondary/repositories/dynamodb.repository.port';
import { DynamoDbClientProviderPort } from '@adapters/secondary/providers/dynamodb.provider.port';

export class DynamoDBClientRepository implements DynamoDbClientRepositoryPort {
  constructor(private _dynamodbClientProvider: DynamoDbClientProviderPort) {}

  async save(item: object): Promise<void> {
    await this._dynamodbClientProvider.saveDocument(item);
  }

  get(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
