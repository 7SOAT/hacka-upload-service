import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { SqsClientProviderPort } from '@adapters/secondary/providers/sqs-client.provider.port';

export class SqsClientProvider implements SqsClientProviderPort {
  private _sqsClient: SQSClient;

  constructor() {
    this._sqsClient = new SQSClient({
      endpoint: 'http://localhost:4566',
      credentials: {
        accessKeyId: 'bla',
        secretAccessKey: 'bla2',
      },
    });
  }

  async sendMessage(): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl:
        'https://localhost.localstack.cloud:4566/000000000000/frame-extractor-queue',
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: 'The Whistler',
        },
        Author: {
          DataType: 'String',
          StringValue: 'John Grisham',
        },
        WeeksOn: {
          DataType: 'Number',
          StringValue: '6',
        },
      },
      MessageBody:
        'Information about current NY Times fiction bestseller for week of 12/11/2016.',
    });

    await this._sqsClient.send(command);
  }
}
