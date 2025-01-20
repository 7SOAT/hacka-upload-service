import { S3ClientRepositoryPort } from 'src/adapters/secondary/repositories/s3-client.repository.port';
import { VideoProcessData } from '@entities/video';

export class UploadFileUseCase {
  constructor(private s3ClientRepository: S3ClientRepositoryPort) {}

  async execute(userId: VideoProcessData, video: Express.Multer.File) {
    await this.s3ClientRepository.saveFile(userId, video);
  }
}
