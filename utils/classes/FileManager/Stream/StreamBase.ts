import { existsSync, lstatSync, PathLike } from 'fs';
import { Stream } from 'stream';
import { FileNotFoundException } from '../../../../exceptions';

export abstract class StreamBase {
  protected _stream: Stream;
  protected _path: PathLike;

  constructor(path: PathLike) {
    if (!existsSync(path) || lstatSync(path).isDirectory()) {
      throw new FileNotFoundException(`'${path}' is not a file.`);
    }

    this._path = path;
  }

  get stream(): Stream {
    return this._stream;
  }

  public abstract create(
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
  ): void;

  public abstract close(): void;
}
