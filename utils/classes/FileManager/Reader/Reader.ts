import { existsSync, lstatSync, readFileSync } from 'fs';
import { EOL } from 'os';
import {
  FileNotFoundException,
  IndexOutOfRangeException,
} from '../../../../exceptions';

export class Reader {
  constructor() {}

  public readLine(
    file: string,
    line: number,
    options?: { encoding: BufferEncoding; flag?: string } | BufferEncoding
  ): Buffer | string {
    const lines: (Buffer | string)[] = this.readLines(file);

    if (line < 0 || line > lines.length) {
      throw new IndexOutOfRangeException(
        `Range has to be between 0-${lines.length}, got ${line}`
      );
    }

    if (options) {
      return lines[line].toString();
    } else {
      return lines[line];
    }
  }

  public readLines(
    file: string,
    options?: { encoding: BufferEncoding; flag?: string } | BufferEncoding
  ): (Buffer | string)[] {
    const file_: string = this.read(file).toString();
    const lines_: string[] = file_.split(EOL);

    if (options) {
      return lines_;
    }

    return lines_.map(line => Buffer.from(line));
  }

  public read(
    file: string,
    options?: { encoding: BufferEncoding; flag?: string } | BufferEncoding
  ): Buffer | string {
    if (!existsSync(file)) {
      throw new FileNotFoundException(`Path ${file} does not exist.`);
    }

    if (!lstatSync(file).isFile()) {
      throw new FileNotFoundException(
        `Path ${file} may exist, but it is not a file.`
      );
    }

    if (options) {
      const file_: string[] = readFileSync(file, options).split(EOL);
      file_.pop();

      return file_.join('');
    }

    const file_: string[] = readFileSync(file).toString().split(EOL);
    file_.pop();

    return Buffer.from(file_.join(''));
  }
}
