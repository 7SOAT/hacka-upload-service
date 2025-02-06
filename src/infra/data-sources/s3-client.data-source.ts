import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { S3ClientDataSourcePort } from './ports/s3-client.data-source.port';
import { EnvironmentServicePort } from 'src/config/environment/ports/environment.service.port';

export class S3ClientDataSource implements S3ClientDataSourcePort {
  private _s3Client: S3Client;

  constructor(private _environments: EnvironmentServicePort) {
    this._s3Client = new S3Client({
      region: this._environments.awsRegion,
      endpoint: this._environments.awsEndpoint,
      credentials: {
        accessKeyId: this._environments.awsAccessKeyId,
        secretAccessKey: this._environments.awsSecretAccessKey,
        sessionToken: this._environments.awsSessionToken,
      },
    });
  }

  async getObject(): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: this._environments.frameExtractorS3Bucket,
      Key: randomUUID(),
    });

    const file = await this._s3Client.send(command);

    return file;
  }

  async putObject(item: any, fileToUpload: Express.Multer.File): Promise<any> {
    const s3Bucket: string = this._environments.frameExtractorS3Bucket;

    const command = new PutObjectCommand({
      Bucket: s3Bucket,
      Key: `${s3Bucket}/${item.s3Key}`,
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
