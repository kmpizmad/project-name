import { EOL } from 'os';
import {
  ArgumentOutOfRangeException,
  IndexOutOfRangeException,
} from '../../../exceptions';
import { StringBuilder } from './StringBuilder';

describe('StringBuilder', () => {
  const stringBuilder: StringBuilder = new StringBuilder();

  beforeEach(() => stringBuilder.append('hello world!'));
  afterEach(() => stringBuilder.clear());

  it('has a length through getter property', () => {
    expect(stringBuilder.length).toBe(12);
  });

  it('has a value through a getter property', () => {
    expect(stringBuilder.value).toBe('hello world!');
  });

  it('appends a string', () => {
    stringBuilder.append('hi').append('again');
    expect(stringBuilder.toString()).toBe('hello world!hiagain');

    stringBuilder.append('!', 0).append('-', 6);
    expect(stringBuilder.toString()).toBe('!hello- world!hiagain');

    stringBuilder.appendLine();
    expect(stringBuilder.toString()).toBe('!hello- world!hiagain' + EOL);

    expect(() => stringBuilder.append('someText', -1)).toThrowError(
      ArgumentOutOfRangeException
    );
  });

  it('inserts a value', () => {
    stringBuilder.insert('world!', 6);
    expect(stringBuilder.toString()).toBe('hello world!world!');

    stringBuilder.insert('-', 5, 3);
    expect(stringBuilder.toString()).toBe('hello--- world!world!');

    stringBuilder.insert('!', 0);
    expect(stringBuilder.toString()).toBe('!hello--- world!world!');

    expect(() => stringBuilder.insert('someOtherText', -1)).toThrowError(
      ArgumentOutOfRangeException
    );
  });

  it('replaces an old value with a new one', () => {
    stringBuilder.replace('world', 'Viktor');
    expect(stringBuilder.toString()).toBe('hello Viktor!');

    stringBuilder.append('Viktor!').replace('Viktor', 'something');
    expect(stringBuilder.toString()).toBe('hello something!something!');

    stringBuilder.replace('something', 'anything', 0, 5);
    expect(stringBuilder.toString()).toBe('hello something!something!');

    expect(() =>
      stringBuilder.replace('someText', 'yetAnotherText', -1, 5)
    ).toThrowError(ArgumentOutOfRangeException);
  });

  it('removes a range', () => {
    stringBuilder.remove(5);
    expect(stringBuilder.toString()).toBe('hello');

    stringBuilder.remove(0, 2).remove(2);
    expect(stringBuilder.toString()).toBe('ll');

    expect(() => stringBuilder.remove(-1)).toThrowError(
      ArgumentOutOfRangeException
    );
    expect(() => stringBuilder.remove(0, 20)).toThrowError(
      IndexOutOfRangeException
    );
  });
});
