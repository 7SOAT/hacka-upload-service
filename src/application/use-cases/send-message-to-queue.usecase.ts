import { SendMessageToQueueGateway } from 'src/adapters/gateways/send-message-to-queue.gateway';
import { SendMessageToQueueUseCasePort } from '../ports/send-message-to-queue.usecase.port';
import { VideoProcessData } from '@entities/video';

export class SendMessageToQueueUseCase
  implements SendMessageToQueueUseCasePort
{
  constructor(
    private _sendMessageToQueueRepository: SendMessageToQueueGateway,
  ) {}

  async execute(videoData: VideoProcessData): Promise<void> {
    await this._sendMessageToQueueRepository.execute(videoData);
  }
}
