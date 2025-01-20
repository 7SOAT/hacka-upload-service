import { VideoProcessData } from 'src/application/entities/video';

export interface S3ClientRepositoryPort {
  saveFile(
    item: VideoProcessData,
    fileBuffer: Express.Multer.File,
  ): Promise<void>;
  getFile(): Promise<void>;
}
