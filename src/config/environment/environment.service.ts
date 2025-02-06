import { ConfigService } from '@nestjs/config';
import { EnvironmentServicePort } from './ports/environment.service.port';
import { Injectable } from 'node_modules/@nestjs/common';

@Injectable()
export class EnvironmentService implements EnvironmentServicePort {
  private _configService: ConfigService;

  constructor() {
    this._configService = new ConfigService();
  }

  get awsEndpoint(): string {
    return this._configService.get<string>('AWS_ENDPOINT');
  }

  get awsRegion(): string {
    return this._configService.get<string>('AWS_REGION');
  }

  get awsAccessKeyId(): string {
    return this._configService.get<string>('AWS_ACCESS_KEY_ID');
  }

  get awsSecretAccessKey(): string {
    return this._configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }

  get awsSessionToken(): string {
    return this._configService.get<string>('AWS_SESSION_TOKEN');
  }

  get frameExtractorQueueUrl(): string {
    return this._configService.get<string>('FRAME_EXTRACTOR_QUEUE_URL');
  }

  get frameExtractorS3Bucket(): string {
    return this._configService.get<string>('FRAME_EXTRACTOR_S3_BUCKET');
  }
}
