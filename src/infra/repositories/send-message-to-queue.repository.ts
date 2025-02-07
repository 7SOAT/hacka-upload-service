import { SendMessageToQueueGateway } from 'src/adapters/gateways/send-message-to-queue.gateway';
import { SQSClientDataSourcePort } from '../data-sources/ports/sqs-client.data-source.port';
import { VideoProcessData } from 'src/core/entities/video';
import { randomUUID } from 'crypto';

export class SendMessageToQueueRepository implements SendMessageToQueueGateway {
  constructor(private _dataSource: SQSClientDataSourcePort) {}

  async execute(videoData: VideoProcessData): Promise<void> {
    await this._dataSource.sendMessage({
      messageId: randomUUID(),
      content: videoData,
    });
  }
}
