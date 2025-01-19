import { Inject, Injectable } from '@nestjs/common';
import {
  FrameExtractorControllerPort,
  FrameExtractorInput,
} from '@controllers/ports/frame-extractor.controller.port';
import { FrameExtractorUseCase } from 'src/application/usecases/frame-extractor.usecase';
import { S3ClientRepository } from 'src/interface/repositories/s3client.repository';
import { S3ClientProviderPort } from 'src/adapters/secondary/providers/s3client.provider.port';
import { Video } from '@entities/video';
import { randomUUID } from 'crypto';
import { SqsClientProviderPort } from 'src/adapters/secondary/providers/sqs-client.provider.port';
import { SqsClientRepository } from 'src/interface/repositories/sqs-client.repository';

@Injectable()
export class FrameExtractorController implements FrameExtractorControllerPort {
  constructor(
    @Inject()
    private s3ClientProvider: S3ClientProviderPort,
    @Inject()
    private sqsClientProvider: SqsClientProviderPort,
  ) {}

  async execute(
    input: FrameExtractorInput,
    file: Express.Multer.File,
  ): Promise<void> {
    const s3ClientRepository = new S3ClientRepository(this.s3ClientProvider);
    const sqsClientRepository = new SqsClientRepository(this.sqsClientProvider);

    const frameExtractorUsecase = new FrameExtractorUseCase(
      s3ClientRepository,
      sqsClientRepository,
    );

    await frameExtractorUsecase.execute(Video.build(randomUUID(), file));
  }
}
