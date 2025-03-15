import type { LoggedInUser } from './User';

declare global {
  namespace Express {
    interface Request {
      loggedinUser?: LoggedInUser;
    }
  }
}