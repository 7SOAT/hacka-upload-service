export interface UploadVideoGateway {
  execute(item: any, file: Express.Multer.File): Promise<void>;
}
