import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { SQSClientDataSourcePort } from './ports/sqs-client.data-source.port';
import { EnvironmentServicePort } from 'src/config/environment/ports/environment.service.port';

export class SQSClientDataSource implements SQSClientDataSourcePort {
  private _sqsClient: SQSClient;

  constructor(private _environments: EnvironmentServicePort) {
    this._sqsClient = new SQSClient({
      endpoint: this._environments.awsEndpoint,
      credentials: {
        accessKeyId: this._environments.awsAccessKeyId,
        secretAccessKey: this._environments.awsSecretAccessKey,
        sessionToken: this._environments.awsSessionToken,
      },
    });
  }

  async sendMessage(message: any): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: this._environments.frameExtractorQueueUrl,
      MessageBody: JSON.stringify(message),
    });

    await this._sqsClient.send(command);
  }
}
