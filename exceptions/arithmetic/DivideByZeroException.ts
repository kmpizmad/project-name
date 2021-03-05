import { ArithmeticException } from './ArithmeticException';

/**
 * Thrown when there is an attempt to divide a number with zero
 */
export class DivideByZeroException extends ArithmeticException {
  constructor(message: string) {
    super(message);
  }
}
