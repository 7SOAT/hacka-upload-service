import { VideoProcessData } from '@entities/video';

export interface SendMessageToQueueGateway {
  execute(videoData: VideoProcessData): Promise<void>;
}
