import { StreamBase } from '../StreamBase';
import {
  createWriteStream,
  existsSync,
  PathLike,
  writeFileSync,
  WriteStream,
} from 'fs';

export class StreamWriter extends StreamBase {
  constructor(path: PathLike) {
    if (!existsSync(path)) {
      writeFileSync(path, '');
    }

    super(path);
  }

  public create(
    options?:
      | string
      | {
          flags?: string;
          encoding?: BufferEncoding;
          fd?: number;
          mode?: number;
          autoClose?: boolean;
          emitClose?: boolean;
          start?: number;
          highWaterMark?: number;
        }
  ): void {
    this._stream = createWriteStream(this._path, options);
  }

  public close(): void {
    (this._stream as WriteStream).close();
  }
}
