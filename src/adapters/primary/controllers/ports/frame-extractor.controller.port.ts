export interface FrameExtractorInput {
  filename: string;
}

export interface FrameExtractorControllerPort {
  execute(input: FrameExtractorInput, file: Express.Multer.File): Promise<void>;
}
