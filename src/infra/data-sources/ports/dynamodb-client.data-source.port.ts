export interface DynamoDbClientDataSourcePort {
  putItem(tableName: string, item: any): Promise<void>;
  getItem(): Promise<void>;
}
