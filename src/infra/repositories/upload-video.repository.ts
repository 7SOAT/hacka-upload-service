import { UploadVideoGateway } from 'src/adapters/gateways/upload-video.gateway';
import { S3ClientDataSourcePort } from '../data-sources/ports/s3-client.data-source.port';

export class UploadVideoRepository implements UploadVideoGateway {
  constructor(private _dataSource: S3ClientDataSourcePort) {}

  async execute(item: any, file: Express.Multer.File) {
    await this._dataSource.putObject(item, file);
  }
}
