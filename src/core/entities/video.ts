import { VideoStatus } from 'src/core/entities/enums/video-status.enum';

export abstract class Video {
  videoId: string;
  originalFilename: string;
  contentType?: string;
}

export abstract class VideoProcessData {
  userId: string;
  video: Video;
  createdAt: string;
  s3Key: string;
  status: VideoStatus;
}
