import { VideoProcessData } from 'src/core/entities/video';

export interface UploadVideoUseCasePort {
  execute(
    videoData: VideoProcessData,
    video: Express.Multer.File,
  ): Promise<void>;
}
