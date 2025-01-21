import { PersistVideoDataGateway } from 'src/adapters/gateways/persist-video-data.gateway';
import { PersistVideoDataUseCasePort } from '../ports/persist-video-data.usecase.port';

export class PersistVideoDataUseCase implements PersistVideoDataUseCasePort {
  constructor(private _persistVideoDataRepository: PersistVideoDataGateway) {}

  async execute(item: object) {
    await this._persistVideoDataRepository.execute(item);
  }
}
