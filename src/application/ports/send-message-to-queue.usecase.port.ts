export interface SendMessageToQueueUseCasePort {
  execute(message: object): Promise<void>;
}
