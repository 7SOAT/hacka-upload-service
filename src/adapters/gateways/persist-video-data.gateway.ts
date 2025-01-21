export interface PersistVideoDataGateway {
  execute(item: any): Promise<void>;
}
