import { Exception } from '@src/exception/exception';

export class WebsiteCouldNotBeReachedException extends Exception {
  getMessage() {
    return 'The website could not be reached.';
  }
}
