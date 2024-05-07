import { User } from './user';

export interface AddMatch {
  you: User | undefined | null;
  rival: User;
  yourResult: number;
  rivalResult: number;
  date: Date;
  isApproved: boolean;
}
