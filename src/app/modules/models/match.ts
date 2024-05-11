import { User } from './user';

export interface Match {
  you: User | undefined | null;
  rival: User;
  yourResult: number;
  rivalResult: number;
  date: Date;
  isApproved: boolean;
  win?: boolean;
}
