import { Exception } from '../Exception';

/**
 * Thrown when there is an attempt to dereference a null object reference
 */
export class NullReferenceException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
