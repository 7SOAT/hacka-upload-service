import { VideoProcessData } from 'src/core/entities/video';
import { randomUUID } from 'crypto';
import { VideoStatus } from 'src/core/entities/enums/video-status.enum';
import { UploadVideoUseCasePort } from 'src/application/ports/upload-video.usecase.port';
import { SendMessageToQueueUseCasePort } from 'src/application/ports/send-message-to-queue.usecase.port';
import { PersistVideoDataUseCasePort } from 'src/application/ports/persist-video-data.usecase.port';
import { UploadVideoControllerPort } from 'src/adapters/controllers/ports/upload-video.controller.port';
import { UploadVideoControllerDto } from './dtos/upload-video.controller.dto';

export class UploadVideoController implements UploadVideoControllerPort {
  constructor(
    private _uploadVideoUseCase: UploadVideoUseCasePort,
    private _sendMessageToQueueUseCase: SendMessageToQueueUseCasePort,
    private _persistVideoDataUseCase: PersistVideoDataUseCasePort,
  ) {}

  async execute(input: UploadVideoControllerDto): Promise<void> {
    const userId = randomUUID();

    const videoData: VideoProcessData = {
      userId,
      video: {
        videoId: input.videoId,
        originalFilename: input.originalFilename,
        contentType: input.contentType,
      },
      s3Key: `${userId}/${input.videoId}/${input.originalFilename}`,
      status: VideoStatus.UPLOADING,
      createdAt: new Date().toISOString(),
    };

    //await this._uploadVideoUseCase.execute(item, file);
    await this._persistVideoDataUseCase.execute(videoData);
    await this._sendMessageToQueueUseCase.execute(videoData);
  }
}
