export class Video {
  constructor(
    private _userId: string,
    private _file: Express.Multer.File,
  ) {}

  static build(userId: string, file: Express.Multer.File) {
    return new Video(userId, file);
  }

  toJson() {
    return {
      userId: this._userId,
      file: this._file,
    };
  }
}
