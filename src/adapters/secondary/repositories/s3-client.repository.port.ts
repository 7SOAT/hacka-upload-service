export interface S3ClientRepositoryPort {
  saveFile(userId: string, fileBuffer: Express.Multer.File): Promise<void>;
  getFile(): Promise<void>;
}
