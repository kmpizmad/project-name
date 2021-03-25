import { Exception } from './Exception';

/**
 * Thrown when a requested method or operation is not implemented
 */
export class NotImplementedException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
