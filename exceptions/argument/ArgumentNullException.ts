import { ArgumentException } from './ArgumentException';

/**
 * Thrown when a null reference is passed to a method that does not accept it as a valid argument
 */
export class ArgumentNullException extends ArgumentException {
  constructor(message: string) {
    super(message);
  }
}
