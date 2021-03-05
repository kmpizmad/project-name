import { Exception } from '../Exception';

/**
 * Thrown when the key specified for accessing an element in a collection does not match any key in the collection
 */
export class KeyNotFoundException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
