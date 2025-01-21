export interface S3ClientDataSourcePort {
  putObject(item: any, fileToUpload: Express.Multer.File): Promise<void>;
  getObject(): Promise<void>;
}
