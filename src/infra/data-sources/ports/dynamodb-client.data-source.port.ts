export interface DynamoDBClientDataSourcePort {
  putItem(tableName: string, item: any): Promise<void>;
  getItem(): Promise<void>;
}
