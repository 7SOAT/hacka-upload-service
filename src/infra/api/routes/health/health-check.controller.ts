import { Controller, Get, Inject } from '@nestjs/common';
import { EnvironmentServicePort } from 'src/config/environment/ports/environment.service.port';

@Controller('health')
export class HealthCheckController {
  constructor(
    @Inject('EnvironmentServicePort')
    private _environments: EnvironmentServicePort,
  ) {}

  @Get()
  async execute() {
    return {
      success: true,
      envs: {
        awsEndpoint: this._environments.awsEndpoint,
        awsRegion: this._environments.awsRegion,
        awsAccessKeyId: this._environments.awsAccessKeyId,
        awsAccessSecretKey: this._environments.awsSecretAccessKey,
        awsSessionToken: this._environments.awsSessionToken,
        frameExtractorQueueUrl: this._environments.frameExtractorQueueUrl,
        frameExtractorS3Bucket: this._environments.frameExtractorS3Bucket,
      },
    };
  }
}
