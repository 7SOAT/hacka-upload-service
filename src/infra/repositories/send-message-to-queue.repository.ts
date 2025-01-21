import { SendMessageToQueueGateway } from 'src/adapters/gateways/send-message-to-queue.gateway';
import { SQSClientDataSourcePort } from '../data-sources/ports/sqs-client.data-source.port';

export class SendMessageToQueueRepository implements SendMessageToQueueGateway {
  constructor(private _dataSource: SQSClientDataSourcePort) {}

  async execute(message: any): Promise<void> {
    await this._dataSource.sendMessage(message);
  }
}
