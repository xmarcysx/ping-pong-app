import { Match } from '../models/match';

export interface AppState {
  userMatches: MatchesState;
}

export interface MatchesState {
  matches: Match[];
  loading: boolean;
}
