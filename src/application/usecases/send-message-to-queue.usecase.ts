import { SqsClientRepositoryPort } from '@adapters/secondary/repositories/sqs-client.repository.port';

export class SendMessageToQueueUseCase {
  constructor(private sqsClientRepository: SqsClientRepositoryPort) {}

  async execute(message: object) {
    await this.sqsClientRepository.sendMessage(message);
  }
}
