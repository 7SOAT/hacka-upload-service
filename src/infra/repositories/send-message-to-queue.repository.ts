import { SendMessageToQueueGateway } from 'src/adapters/gateways/send-message-to-queue.gateway';
import { SQSClientDataSource } from '../data-sources/sqs-client.data-source';

export class SendEventToQueueRepository implements SendMessageToQueueGateway {
  constructor(private dataSource: SQSClientDataSource) {}

  async execute(message: any): Promise<void> {
    await this.dataSource.sendMessage(message);
  }
}
