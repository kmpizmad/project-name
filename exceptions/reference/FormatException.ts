import { Exception } from '../Exception';

/**
 * Thrown when a format of an argument is invalid
 */
export class FormatException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
