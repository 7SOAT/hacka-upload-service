import { VideoProcessData } from 'src/core/entities/video';
import { UploadVideoGateway } from 'src/adapters/gateways/upload-video.gateway';
import { UploadVideoUseCasePort } from '../ports/upload-video.usecase.port';
import { Injectable } from 'node_modules/@nestjs/common';

@Injectable()
export class UploadVideoUseCase implements UploadVideoUseCasePort {
  constructor(private _uploadVideoRepository: UploadVideoGateway) {}

  async execute(videoData: VideoProcessData, video: Express.Multer.File) {
    await this._uploadVideoRepository.execute(videoData, video);
  }
}
