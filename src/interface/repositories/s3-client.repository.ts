import { S3ClientRepositoryPort } from 'src/adapters/secondary/repositories/s3-client.repository.port';
import { S3ClientProviderPort } from 'src/adapters/secondary/providers/s3-client.provider.port';
import { VideoProcessData } from 'src/application/entities/video';

export class S3ClientRepository implements S3ClientRepositoryPort {
  constructor(private _s3ClientProvider: S3ClientProviderPort) {}

  async saveFile(
    item: VideoProcessData,
    fileBuffer: Express.Multer.File,
  ): Promise<void> {
    await this._s3ClientProvider.saveFileToS3(item, fileBuffer);
  }

  getFile(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
