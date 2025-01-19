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

  async sendMessage(message: object): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl:
        'https://localhost.localstack.cloud:4566/000000000000/frame-extractor-queue',
      MessageBody: JSON.stringify(message),
    });

    await this._sqsClient.send(command);
  }
}
