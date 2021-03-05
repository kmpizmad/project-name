import { Exception } from '../Exception';

/**
 * Thrown when one of the arguments provided to a method is invalid
 */
export class ArgumentException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
