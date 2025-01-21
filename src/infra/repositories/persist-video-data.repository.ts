import { PersistVideoDataGateway } from 'src/adapters/gateways/persist-video-data.gateway';
import { DynamoDBClientDataSourcePort } from '../data-sources/ports/dynamodb-client.data-source.port';

export class PersistVideoDataRepository implements PersistVideoDataGateway {
  private videosTableName = 'video-tables';

  constructor(private _dataSource: DynamoDBClientDataSourcePort) {}

  async execute(item: any) {
    await this._dataSource.putItem(this.videosTableName, item);
  }
}
