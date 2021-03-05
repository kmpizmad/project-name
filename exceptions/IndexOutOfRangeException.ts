import { Exception } from './Exception';

export class IndexOutOfRangeException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
