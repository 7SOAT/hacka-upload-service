import { S3ClientRepositoryPort } from '@adapters/secondary/repositories/s3client.repository.port';
import { S3ClientProviderPort } from 'src/adapters/secondary/providers/s3client.provider.port';

export class S3ClientRepository implements S3ClientRepositoryPort {
  constructor(private _s3ClientProvider: S3ClientProviderPort) {}

  async saveFile(fileBuffer: any): Promise<void> {
    await this._s3ClientProvider.saveFileToS3(fileBuffer);
  }

  getFile(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
