import { User } from './user';

export interface Match {
  you?: User;
  youUid: string;
  rival?: User;
  rivalUid: string;
  yourResult: number;
  rivalResult: number;
  date: Date;
  isApproved: boolean;
  win?: boolean;
}
