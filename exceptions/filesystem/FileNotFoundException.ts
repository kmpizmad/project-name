import { Exception } from '../Exception';

/**
 * Thrown when an attemp is made to access a file that is not there
 */
export class FileNotFoundException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
