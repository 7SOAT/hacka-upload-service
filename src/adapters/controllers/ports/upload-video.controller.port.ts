import { UploadVideoControllerDto } from '@adapters/controllers/dtos/upload-video.controller.dto';

export interface UploadVideoControllerPort {
  execute(input: UploadVideoControllerDto): Promise<void>;
}
