import { red } from 'chalk';

/**
 * Represents errors that occur during runtime
 */
export class Exception {
  protected _name: string;
  protected _message: string;

  constructor(message: string) {
    this._name = this.constructor.name;
    this._message = message;
  }

  get name(): string {
    return this._name;
  }

  get message(): string {
    return `${red(this._name) + ':'} ${this._message}`;
  }

  set message(value: string) {
    this._message = value;
  }
}
