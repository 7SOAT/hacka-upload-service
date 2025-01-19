import { DynamoDbClientProviderPort } from '@adapters/secondary/providers/dynamodb.provider.port';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export class DynamoDbClientProvider implements DynamoDbClientProviderPort {
  private _dynamodbClient: DynamoDBClient;

  constructor() {
    this._dynamodbClient = new DynamoDBClient({
      endpoint: 'http://localhost:4566',
      credentials: {
        accessKeyId: 'bla',
        secretAccessKey: 'bla2',
      },
    });
  }

  async saveDocument(item: object): Promise<void> {
    const command = new PutItemCommand({
      TableName: 'videos-table',
      Item: marshall(item),
    });

    await this._dynamodbClient.send(command);
  }
  getDocument(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
