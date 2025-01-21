import { VideoProcessData } from 'src/core/entities/video';
import { randomUUID } from 'crypto';
import { VideoStatus } from 'src/core/entities/enums/video-status.enum';
import { UploadVideoUseCasePort } from 'src/application/ports/upload-video.usecase.port';
import { SendMessageToQueueUseCasePort } from 'src/application/ports/send-message-to-queue.usecase.port';
import { PersistVideoDataUseCasePort } from 'src/application/ports/persist-video-data.usecase.port';
import { UploadVideoControllerPort } from './ports/upload-video.controller.port';

export class UploadVideoController implements UploadVideoControllerPort {
  constructor(
    private _uploadVideoUseCase: UploadVideoUseCasePort,
    private _sendMessageToQueueUseCase: SendMessageToQueueUseCasePort,
    private _persistVideoDataUseCase: PersistVideoDataUseCasePort,
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const userId = randomUUID();
    const videoId = randomUUID();

    const item: VideoProcessData = {
      userId: userId,
      videoId: videoId,
      s3Key: `${userId}/${videoId}/${file.originalname}`,
      status: VideoStatus.UPLOADING,
      createdAt: new Date().toISOString(),
    };

    await this._uploadVideoUseCase.execute(item, file);
    await this._persistVideoDataUseCase.execute(item);
    await this._sendMessageToQueueUseCase.execute({
      UserId: item.userId,
      VideoId: item.videoId,
      S3Key: item.s3Key,
      Status: item.status,
      CreatedAt: item.createdAt,
      MessageId: randomUUID(),
    });
  }
}
