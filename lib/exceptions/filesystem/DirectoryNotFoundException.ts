import { Exception } from '../Exception';

/**
 * Thrown when an attemp is made to access a directory that is not there
 */
export class DirectoryNotFoundException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
