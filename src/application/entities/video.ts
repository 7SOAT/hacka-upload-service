import { VideoStatus } from '@enums/video-status.enum';

export abstract class VideoProcessData {
  userId: string;
  videoId: string;
  createdAt: string;
  s3Key: string;
  status: VideoStatus;
}
