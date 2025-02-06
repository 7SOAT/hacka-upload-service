import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBClientDataSourcePort } from './ports/dynamodb-client.data-source.port';
import { EnvironmentServicePort } from 'src/config/environment/ports/environment.service.port';

export class DynamoDBClientDataSource implements DynamoDBClientDataSourcePort {
  private _dynamodbClient: DynamoDBClient;

  constructor(_environments: EnvironmentServicePort) {
    this._dynamodbClient = new DynamoDBClient({
      endpoint: _environments.awsEndpoint,
      credentials: {
        accessKeyId: _environments.awsAccessKeyId,
        secretAccessKey: _environments.awsSecretAccessKey,
        sessionToken: _environments.awsSessionToken,
      },
    });
  }

  async putItem(tableName: string, item: object): Promise<void> {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: marshall(item),
    });

    await this._dynamodbClient.send(command);
  }
  getItem(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
