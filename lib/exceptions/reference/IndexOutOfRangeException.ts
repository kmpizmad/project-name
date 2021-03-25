import { Exception } from '../Exception';

/**
 * Thrown when an attemp is made to acces an element of a collection with an index that is outside its bounds
 */
export class IndexOutOfRangeException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
