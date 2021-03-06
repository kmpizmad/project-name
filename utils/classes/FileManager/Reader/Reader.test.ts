import { join } from 'path';
import {
  FileNotFoundException,
  IndexOutOfRangeException,
} from '../../../../exceptions';
import { Reader } from './Reader';

describe('Reader', () => {
  const reader: Reader = new Reader();
  const path: string = join(process.cwd(), 'environments', '.env.example');
  const options:
    | { encoding: BufferEncoding; flag?: string }
    | BufferEncoding = { encoding: 'utf-8' };

  it('reads entire file as string', () => {
    const result = reader.read(path, options);
    expect(result).toBe('PORT=8000');
  });

  it('reads entire file as buffer', () => {
    const result = reader.read(path);
    expect(result).toEqual(Buffer.from('PORT=8000'));
  });

  it('reads each line of the file as array<string>', () => {
    const result = reader.readLines(path, options);
    expect(result).toEqual(['PORT=8000']);
  });

  it('reads each line of the file as array<buffer>', () => {
    const result = reader.readLines(path);
    expect(result).toEqual([Buffer.from('PORT=8000')]);
  });

  it('reads a line from a file by index as string', () => {
    const result = reader.readLine(path, 0, options);
    expect(result).toBe('PORT=8000');
  });

  it('reads a line from a file by index as buffer', () => {
    const result = reader.readLine(path, 0);
    expect(result).toEqual(Buffer.from('PORT=8000'));
  });

  it('throws IndexOutOfRangeException', () => {
    expect(() => reader.readLine(path, -1)).toThrowError(
      IndexOutOfRangeException
    );
  });

  it('throws FileNotFoundException', () => {
    expect(() => reader.read('src')).toThrowError(FileNotFoundException);
    expect(() => reader.read('')).toThrowError(FileNotFoundException);
  });
});
