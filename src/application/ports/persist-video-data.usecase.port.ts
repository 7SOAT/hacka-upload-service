export interface PersistVideoDataUseCasePort {
  execute(item: object): Promise<void>;
}
