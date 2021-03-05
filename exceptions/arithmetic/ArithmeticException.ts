import { Exception } from '../Exception';

/**
 * Thrown for errors in an arithmetic, casting, or conversion operation
 */
export class ArithmeticException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
