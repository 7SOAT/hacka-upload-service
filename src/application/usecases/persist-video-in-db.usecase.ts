import { DynamoDbClientRepositoryPort } from '@adapters/secondary/repositories/dynamodb.repository.port';

export class PersistVideoInDbUseCase {
  constructor(private _dynamodbRepository: DynamoDbClientRepositoryPort) {}

  async execute(item: object) {
    await this._dynamodbRepository.save(item);
  }
}
