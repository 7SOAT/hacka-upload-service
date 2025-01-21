export interface UploadVideoControllerPort {
  execute(file: Express.Multer.File): Promise<void>;
}
