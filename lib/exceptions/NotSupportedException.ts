import { Exception } from './Exception';

/**
 * Thrown when an invoked method is not supported
 */
export class NotSupportedException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
