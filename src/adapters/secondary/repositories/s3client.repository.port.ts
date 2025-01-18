export interface S3ClientRepositoryPort {
  saveFile(fileBuffer: any): Promise<void>;
  getFile(): Promise<void>;
}
