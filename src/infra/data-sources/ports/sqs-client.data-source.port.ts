import { SendMessageDto } from '@data-sources/dtos/sqs-client.data-source.dto';

export interface SQSClientDataSourcePort {
  sendMessage(message: SendMessageDto): Promise<void>;
}
