import { SendMessageToQueueGateway } from 'src/adapters/gateways/send-message-to-queue.gateway';
import { SendMessageToQueueUseCasePort } from '../ports/send-message-to-queue.usecase.port';

export class SendMessageToQueueUseCase
  implements SendMessageToQueueUseCasePort
{
  constructor(
    private _sendMessageToQueueRepository: SendMessageToQueueGateway,
  ) {}

  async execute(message: object) {
    await this._sendMessageToQueueRepository.execute(message);
  }
}
