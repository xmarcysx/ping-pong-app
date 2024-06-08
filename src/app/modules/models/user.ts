export interface User {
  username: string;
  profileImg: string;
  loses: number;
  wins: number;
  kingOfTheDayWins: number;
  uid: string;
  email?: string;
  matches?: [];
}
