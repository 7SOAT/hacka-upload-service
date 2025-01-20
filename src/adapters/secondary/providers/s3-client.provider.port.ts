import { VideoProcessData } from 'src/application/entities/video';

export interface S3ClientProviderPort {
  getFileFromS3(): Promise<any>;
  saveFileToS3(
    item: VideoProcessData,
    fileBuffer: Express.Multer.File,
  ): Promise<any>;
}
