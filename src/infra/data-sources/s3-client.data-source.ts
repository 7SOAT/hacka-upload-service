import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { S3ClientDataSourcePort } from './ports/s3-client.data-source.port';

const S3Bucket = 'frame-extractor-storage';

export class S3ClientDataSource implements S3ClientDataSourcePort {
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

  async getObject(): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: S3Bucket,
      Key: randomUUID(),
    });

    const file = await this._s3Client.send(command);
    console.log({
      metadata: file.$metadata,
    });

    return file;
  }

  async putObject(item: any, fileToUpload: Express.Multer.File): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: S3Bucket,
      Key: `${S3Bucket}/${item.s3Key}`,
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
