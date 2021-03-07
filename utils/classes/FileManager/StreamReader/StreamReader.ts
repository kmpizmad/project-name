import {
  existsSync,
  lstatSync,
  createReadStream,
  ReadStream,
  PathLike,
} from 'fs';
import { EOL } from 'os';
import {
  FileNotFoundException,
  IndexOutOfRangeException,
} from '../../../../exceptions';

export class StreamReader {
  protected _stream: ReadStream;
  protected _path: PathLike;

  constructor(path: PathLike) {
    if (!existsSync(path) && !lstatSync(path).isFile()) {
      throw new FileNotFoundException(`'${path}' is not a file.`);
    }

    this._path = path;
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
    this._stream = createReadStream(this._path, options);
  }

  public close(): void {
    this._stream.close();
  }

  public destroy(): void {
    this._stream.destroy();
  }

  public async readChunks(): Promise<string[]> {
    const chunks: string[] = [];

    return new Promise((resolve, reject) => {
      this._stream.on('data', chunk => chunks.push(chunk.toString('utf-8')));
      this._stream.on('error', err => reject(err));
      this._stream.on('end', () => resolve(chunks));
    });
  }

  public async readChunk(chunk: number): Promise<string> {
    const chunks: string[] = await this.readChunks();

    if (chunk < 0 || chunk > chunks.length) {
      throw new IndexOutOfRangeException(
        `${chunk} was out of range. Supported range is 0-${chunks.length}.`
      );
    }

    return chunks[chunk];
  }

  public async readLines(): Promise<string[]> {
    const file: string = (await this.readChunks()).join('');
    const lines: string[] = file.split(EOL);
    return lines;
  }

  public async readLine(line: number): Promise<string> {
    const lines: string[] = await this.readLines();

    if (line < 0 || line > lines.length) {
      throw new IndexOutOfRangeException(
        `${line} was out of range. Supported range is 0-${lines.length}.`
      );
    }

    return lines[line];
  }

  public async contains(
    value: string | Buffer,
    caseSensitive?: boolean
  ): Promise<boolean> {
    const file: string = (await this.readChunks()).join('');
    const str: string = caseSensitive ? file : file.toLowerCase();
    const val: string = value.toString('utf-8');

    return str.includes(caseSensitive ? val : val.toLowerCase());
  }
}
