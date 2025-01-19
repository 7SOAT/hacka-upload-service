import { Inject, Injectable } from '@nestjs/common';
import {
  FrameExtractorControllerPort,
  FrameExtractorInput,
} from '@controllers/ports/frame-extractor.controller.port';
import { S3ClientRepository } from 'src/interface/repositories/s3-client.repository';
import { S3ClientProviderPort } from 'src/adapters/secondary/providers/s3-client.provider.port';
import { Video } from '@entities/video';
import { randomUUID } from 'crypto';
import { SqsClientProviderPort } from 'src/adapters/secondary/providers/sqs-client.provider.port';
import { SqsClientRepository } from 'src/interface/repositories/sqs-client.repository';
import { UploadFileUseCase } from 'src/application/usecases/upload-file.usecase';
import { SendMessageToQueueUseCase } from 'src/application/usecases/send-message-to-queue.usecase';
import { DynamoDbClientProviderPort } from 'src/adapters/secondary/providers/dynamodb.provider.port';
import { DynamoDBClientRepository } from 'src/interface/repositories/dynamodb-client.repository';
import { PersistVideoInDbUseCase } from 'src/application/usecases/persist-video-in-db.usecase';

@Injectable()
export class FrameExtractorController implements FrameExtractorControllerPort {
  constructor(
    @Inject()
    private _s3ClientProvider: S3ClientProviderPort,
    @Inject()
    private _sqsClientProvider: SqsClientProviderPort,
    @Inject()
    private _dynamodbClientProvider: DynamoDbClientProviderPort,
  ) {}

  async execute(
    input: FrameExtractorInput,
    file: Express.Multer.File,
  ): Promise<void> {
    const s3ClientRepository = new S3ClientRepository(this._s3ClientProvider);
    const sqsClientRepository = new SqsClientRepository(
      this._sqsClientProvider,
    );
    const dynamoDBClientRepository = new DynamoDBClientRepository(
      this._dynamodbClientProvider,
    );

    const uploadFileUsecase = new UploadFileUseCase(s3ClientRepository);
    const sendMessageToQueueUsecase = new SendMessageToQueueUseCase(
      sqsClientRepository,
    );
    const persistVideoInDbUsecase = new PersistVideoInDbUseCase(
      dynamoDBClientRepository,
    );

    const item = {
      userId: randomUUID(),
      videoId: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await uploadFileUsecase.execute(Video.build(item.userId, file));
    await persistVideoInDbUsecase.execute(item);
    await sendMessageToQueueUsecase.execute({
      ...item,
      messageId: randomUUID(),
    });
  }
}
