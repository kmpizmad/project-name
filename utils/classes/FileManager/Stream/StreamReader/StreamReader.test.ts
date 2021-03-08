import { ReadStream } from 'fs';
import { EOL } from 'os';
import { join } from 'path';
import {
  FileNotFoundException,
  IndexOutOfRangeException,
} from '../../../../../exceptions';
import { StreamReader } from './StreamReader';

describe('StreamReader', () => {
  const path = join(process.cwd(), 'environments', '.env.example');
  const streamReader: StreamReader = new StreamReader(path);

  beforeEach(() => streamReader.create());
  afterEach(() => streamReader.close());

  it('validates \'path\' param', () => {
    expect(() => new StreamReader('src')).toThrowError(FileNotFoundException);
  });

  it('can access the stream through a property', () => {
    expect(streamReader.stream).toBeInstanceOf(ReadStream);
  });

  it('reads all chunks', () => {
    expect(streamReader.readChunks()).resolves.toEqual(['PORT=8000' + EOL]);
  });

  it('reads a specific chunk', () => {
    expect(streamReader.readChunk(0)).resolves.toEqual('PORT=8000' + EOL);
    expect(() => streamReader.readChunk(-1)).rejects.toThrowError(
      IndexOutOfRangeException
    );
  });

  it('reads all lines', () => {
    expect(streamReader.readLines()).resolves.toEqual(['PORT=8000', '']);
  });

  it('reads a specific line', () => {
    expect(streamReader.readLine(0)).resolves.toEqual('PORT=8000');
    expect(() => streamReader.readLine(-1)).rejects.toThrowError(
      IndexOutOfRangeException
    );
  });

  it('contains a specific string or buffer', () => {
    expect(streamReader.contains('port')).resolves.toBeTruthy();
    expect(streamReader.contains('pOrT')).resolves.toBeTruthy();
    expect(streamReader.contains('something')).resolves.toBeFalsy();
    expect(streamReader.contains('PORT', true)).resolves.toBeTruthy();
    expect(streamReader.contains('PORt', true)).resolves.toBeFalsy();
    expect(streamReader.contains('SOMETHING', true)).resolves.toBeFalsy();
  });
});
