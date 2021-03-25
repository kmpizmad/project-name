import { ArgumentException } from './ArgumentException';

/**
 * Thrown when the value of an argument is outside the allowable range of values as defined by the invoked method
 */
export class ArgumentOutOfRangeException extends ArgumentException {
  constructor(message: string) {
    super(message);
  }
}
