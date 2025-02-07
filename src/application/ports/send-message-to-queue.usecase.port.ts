import { VideoProcessData } from '@entities/video';

export interface SendMessageToQueueUseCasePort {
  execute(videoData: VideoProcessData): Promise<void>;
}
