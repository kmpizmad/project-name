import { Exception } from './Exception';

export class ArgumentException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
