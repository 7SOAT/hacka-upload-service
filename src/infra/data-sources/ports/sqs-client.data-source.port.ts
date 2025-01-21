export interface SQSClientDataSourcePort {
  sendMessage(message: any): Promise<void>;
}
