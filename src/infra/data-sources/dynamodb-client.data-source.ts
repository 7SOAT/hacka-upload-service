import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoDbClientDataSourcePort } from './ports/dynamodb-client.data-source.port';
import { Injectable } from 'node_modules/@nestjs/common';

export class DynamoDbClientDataSource implements DynamoDbClientDataSourcePort {
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
