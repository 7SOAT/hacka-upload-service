import { S3ClientRepositoryPort } from '@adapters/secondary/repositories/s3client.repository.port';
import { Video } from '@entities/video';
import { SqsClientRepositoryPort } from '@adapters/secondary/repositories/sqs-client.repository.port';

export class FrameExtractorUseCase {
  constructor(
    private s3ClientRepository: S3ClientRepositoryPort,
    private sqsClientRepository: SqsClientRepositoryPort,
  ) {}

  async execute(video: Video) {
    await this.s3ClientRepository.saveFile(video.toJson().file);
    await this.sqsClientRepository.sendMessage();
  }
}
