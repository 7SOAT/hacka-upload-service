import { S3ClientRepositoryPort } from '@adapters/secondary/repositories/s3client.repository.port';
import { Video } from '@entities/video';

export class FrameExtractorUseCase {
  constructor(private s3ClientRepository: S3ClientRepositoryPort) {}

  async execute(video: Video) {
    this.s3ClientRepository.saveFile(video.toJson().file);
  }
}
