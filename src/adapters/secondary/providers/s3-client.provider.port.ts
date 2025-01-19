export interface S3ClientProviderPort {
  getFileFromS3(): Promise<any>;
  saveFileToS3(userId: string, fileBuffer: Express.Multer.File): Promise<any>;
}
