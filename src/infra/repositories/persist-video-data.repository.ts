import { PersistVideoDataGateway } from 'src/adapters/gateways/persist-video-data.gateway';
import { DynamoDbClientDataSourcePort } from '../data-sources/ports/dynamodb-client.data-source.port';

export class PersistVideoDataRepository implements PersistVideoDataGateway {
  private videosTableName = 'video-tables';

  constructor(private dataSource: DynamoDbClientDataSourcePort) {}

  async execute(item: any) {
    await this.dataSource.putItem(this.videosTableName, item);
  }
}
