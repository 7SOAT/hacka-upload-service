import { Module } from '@nestjs/common';
import { GetPreSignedUrlGateway } from 'src/adapters/gateways/get-presigned-url.gateway';
import { GetPreSignedUrlUseCasePort } from 'src/application/ports/get-presigned-url.usecase';
import { GetPreSignedUrlUseCase } from 'src/application/use-cases/get-presigned-url.usecase';
import { EnvironmentService } from 'src/config/environment/environment.service';
import { EnvironmentServicePort } from 'src/config/environment/ports/environment.service.port';
import { S3ClientDataSourcePort } from 'src/infra/data-sources/ports/s3-client.data-source.port';
import { S3ClientDataSource } from 'src/infra/data-sources/s3-client.data-source';
import { GetPreSignedUrlRepository } from 'src/infra/repositories/get-presigned-url.repository';
import { GetPreSignedUrlRoute } from './get-presigned-url.controller';
import { GetPreSignedUrlController } from 'src/adapters/controllers/get-presigned-url.controller';

@Module({
  controllers: [GetPreSignedUrlRoute],
  providers: [
    {
      provide: 'EnvironmentServicePort',
      useClass: EnvironmentService,
    },
    {
      provide: 'S3ClientDataSourcePort',
      useFactory: (_environments: EnvironmentServicePort) => {
        return new S3ClientDataSource(_environments);
      },
      inject: ['EnvironmentServicePort'],
    },
    {
      provide: 'GetPreSignedUrlGateway',
      useFactory: (_dataSource: S3ClientDataSourcePort) => {
        return new GetPreSignedUrlRepository(_dataSource);
      },
      inject: ['S3ClientDataSourcePort'],
    },
    {
      provide: 'GetPreSignedUrlUseCasePort',
      useFactory: (_repository: GetPreSignedUrlGateway) => {
        return new GetPreSignedUrlUseCase(_repository);
      },
      inject: ['GetPreSignedUrlGateway'],
    },
    {
      provide: 'GetPreSignedUrlControllerPort',
      useFactory: (_useCase: GetPreSignedUrlUseCasePort) => {
        return new GetPreSignedUrlController(_useCase);
      },
      inject: ['GetPreSignedUrlUseCasePort'],
    },
  ],
  exports: ['GetPreSignedUrlControllerPort'],
})
export default class GetPreSignedUrlRouteModule {}
