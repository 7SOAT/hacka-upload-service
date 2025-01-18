export interface S3ClientProviderPort {
  getFileFromS3(): Promise<any>;
  saveFileToS3(fileBuffer: any): Promise<any>;
}
