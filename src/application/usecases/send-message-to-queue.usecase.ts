import { SqsClientRepositoryPort } from '@adapters/secondary/repositories/sqs-client.repository.port';

export class SendMessageToQueueUseCase {
  constructor(private sqsClientRepository: SqsClientRepositoryPort) {}

  async execute() {
    await this.sqsClientRepository.sendMessage();
  }
}
