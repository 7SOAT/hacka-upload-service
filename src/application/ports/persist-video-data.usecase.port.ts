import { VideoProcessData } from '@entities/video';

export interface PersistVideoDataUseCasePort {
  execute(videoData: VideoProcessData): Promise<void>;
}
