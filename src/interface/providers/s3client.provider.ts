import { S3ClientProviderPort } from 'src/adapters/secondary/providers/s3client.provider.port';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

export class S3ClientProvider implements S3ClientProviderPort {
  private _s3Client: S3Client;
  constructor() {
    this._s3Client = new S3Client({
      region: 'us-east-1',
      endpoint: 'http://localhost:4566',
      credentials: {
        accessKeyId: 'bla',
        secretAccessKey: 'bla2',
      },
    });
  }

  async getFileFromS3(): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: 'frame-extractor-storage',
      Key: randomUUID(),
    });

    const file = await this._s3Client.send(command);
    console.log({
      metadata: file.$metadata,
    });

    return file;
  }

  async saveFileToS3(fileToUpload: Express.Multer.File): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: 'frame-extractor-storage',
      Key: 'frame-extractor-storage/myFiles/' + fileToUpload.originalname,
      Body: fileToUpload.buffer,
      ContentType: fileToUpload.mimetype,
    });

    try {
      await this._s3Client.send(command);
    } catch (error) {
      throw error;
    }
  }
}
