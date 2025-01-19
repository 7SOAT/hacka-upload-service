import { Inject, Injectable } from '@nestjs/common';
import {
  FrameExtractorControllerPort,
  FrameExtractorInput,
} from '@controllers/ports/frame-extractor.controller.port';
import { S3ClientRepository } from 'src/interface/repositories/s3client.repository';
import { S3ClientProviderPort } from 'src/adapters/secondary/providers/s3client.provider.port';
import { Video } from '@entities/video';
import { randomUUID } from 'crypto';
import { SqsClientProviderPort } from 'src/adapters/secondary/providers/sqs-client.provider.port';
import { SqsClientRepository } from 'src/interface/repositories/sqs-client.repository';
import { UploadFileUseCase } from 'src/application/usecases/upload-file.usecase';
import { SendMessageToQueueUseCase } from 'src/application/usecases/send-message-to-queue.usecase';

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

    const uploadFileUsecase = new UploadFileUseCase(s3ClientRepository);
    const sendMessageToQueueUsecase = new SendMessageToQueueUseCase(
      sqsClientRepository,
    );

    await uploadFileUsecase.execute(Video.build(randomUUID(), file));
    await sendMessageToQueueUsecase.execute();
  }
}
