import { Injectable } from '@nestjs/common';
import { FrameExtractorInput } from '@controllers/ports/frame-extractor.controller.port';

@Injectable()
export class FrameExtractorController {
  constructor() {}

  async execute(
    input: FrameExtractorInput,
    file: Express.Multer.File,
  ): Promise<void> {
    console.log(`input received`, input);
    console.log(`file metadata`, file);

    await Promise.resolve();
  }
}
