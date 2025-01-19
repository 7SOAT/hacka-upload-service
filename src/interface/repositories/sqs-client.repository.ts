import { SqsClientRepositoryPort } from '@adapters/secondary/repositories/sqs-client.repository.port';
import { SqsClientProviderPort } from '@adapters/secondary/providers/sqs-client.provider.port';

export class SqsClientRepository implements SqsClientRepositoryPort {
  constructor(private sqsClientProvider: SqsClientProviderPort) {}

  async sendMessage(): Promise<void> {
    await this.sqsClientProvider.sendMessage();
  }
}
