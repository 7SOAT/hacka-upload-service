import { GetPreSignedUrlGateway } from 'src/adapters/gateways/get-presigned-url.gateway';
import { S3ClientDataSourcePort } from '../data-sources/ports/s3-client.data-source.port';

export class GetPreSignedUrlRepository implements GetPreSignedUrlGateway {
  constructor(private _dataSource: S3ClientDataSourcePort) {}

  async execute(s3Key: string): Promise<string> {
    return await this._dataSource.getPreSignedUrl(s3Key);
  }
}
