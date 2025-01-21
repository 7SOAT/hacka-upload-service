export interface SendMessageToQueueGateway {
  execute(message: any): Promise<void>;
}
