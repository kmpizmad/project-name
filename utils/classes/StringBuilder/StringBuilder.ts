import { EOL } from 'os';
import {
  ArgumentException,
  Exception,
  IndexOutOfRangeException,
} from '../../../exceptions';

export class StringBuilder {
  protected _str: string;

  constructor(str?: string) {
    this._str = str || '';
  }

  get value(): string {
    return this._str;
  }

  get length(): number {
    return this._str.length;
  }

  /**
   * @returns the string representation of this instance
   */
  public toString(): string {
    return this._str;
  }

  /**
   * Appends the value to the value of this instance
   * @param value
   * @param startIndex starting position
   * @returns this instance
   */
  public append(value: string | number | boolean, startIndex?: number): this {
    const value_: string = value.toString();
    const index_: number = startIndex ?? this._str.length;

    if (index_ < 0 || index_ > this._str.length) {
      const ex: Exception = new ArgumentException(
        '\'startIndex\' was out of range.'
      );

      ex.message = `${ex.message}\n${{
        argumentValue: startIndex,
      }}`;

      throw ex;
    }

    if (index_ == this._str.length) {
      this._str += value_;
    } else {
      this.insert(value_, index_);
    }

    return this;
  }

  /**
   * Appends a newline to the value of this instance
   * @returns this instance
   */
  public appendLine(): this {
    this._str += EOL;
    return this;
  }

  /**
   * Inserts the value into the value of this instance
   * @param value
   * @param index starting position
   * @param count repeat the insertion for this amount (default: 1)
   * @returns this instance
   */
  public insert(
    value: string | number | boolean,
    index: number,
    count?: number
  ): this {
    const value_: string = value.toString();
    const count_: number = count || 1;

    if (index < 0 || index > this._str.length) {
      const ex: Exception = new ArgumentException('\'index\' was out of range.');

      ex.message = `${ex.message}\n${{
        argumentValue: index,
      }}`;

      throw ex;
    }

    for (let c: number = 0; c < count_; c++) {
      const newStr: string = this.__insert(value_, index);
      this._str = newStr;
    }

    return this;
  }

  /**
   * Replaces all occurences of the old value with the new value
   * @param oldValue
   * @param newValue
   * @param startIndex starting position
   * @param count length of the substring
   * @return this instance
   */
  public replace(
    oldValue: string | number | boolean,
    newValue: string | number | boolean,
    startIndex?: number,
    count?: number
  ): this {
    const oldValue_: RegExp = new RegExp(oldValue.toString(), 'g');
    const newValue_: string = newValue.toString();
    const index_: number = startIndex || 0;
    const count_: number = count || this._str.length;

    if (index_ < 0 || index_ > this._str.length) {
      const ex: Exception = new ArgumentException(
        '\'startIndex\' was out of range.'
      );

      ex.message = `${ex.message}\n${{
        argumentValue: index_,
      }}`;

      throw ex;
    }

    const subStr_: string = this._str
      .substring(index_, count_)
      .replace(oldValue_, newValue_);

    this.remove(index_, count_).insert(subStr_, index_);

    return this;
  }

  /**
   * Removes the specified range from the value of this instance
   * @param startIndex starting position
   * @param count length of the substring
   * @returns this instance
   */
  public remove(startIndex: number, count?: number): this {
    const count_: number = count || this._str.length;
    const strArr_: string[] = this._str.split('');

    if (startIndex < 0 || startIndex > this._str.length) {
      const ex: Exception = new ArgumentException(
        '\'startIndex\' was out of range.'
      );

      ex.message = `${ex.message}\n${{
        argumentValue: startIndex,
      }}`;

      throw ex;
    }

    for (let i: number = startIndex; i < count_; i++) {
      if (strArr_[i] == undefined) {
        const ex: Exception = new IndexOutOfRangeException('');
        throw ex;
      }

      strArr_[i] = '';
    }

    this._str = strArr_.join('');

    return this;
  }

  /**
   * Clears the current value of the instance
   * @returns this instance
   */
  public clear(): this {
    this._str = '';
    return this;
  }

  /**
   * Insert a value at the given index in a string
   * @param value string to be inserted
   * @param index starting position
   * @returns the new string
   */
  private __insert(value: string, index: number): string {
    let str_: string = '';

    for (let i: number = 0; i < index; i++) {
      str_ += this._str[i];
    }

    str_ += value;

    for (let i: number = index; i < this._str.length; i++) {
      str_ += this._str[i];
    }

    return str_;
  }
}
