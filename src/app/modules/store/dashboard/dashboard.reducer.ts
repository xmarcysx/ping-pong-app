import { createFeature, createReducer, on } from '@ngrx/store';
import {
  addMatchToUserMatches,
  loadUserMatches,
  loadUserMatchesSuccess,
} from './dashboard.actions';
import { Match } from '../../models/match';
import { MatchesState } from '../store';

const initialState: MatchesState = {
  matches: [] as Match[],
  loading: true,
};

const userMatchesFeature = createFeature({
  name: 'userMatches',
  reducer: createReducer(
    initialState,
    on(loadUserMatches, (state) => ({ ...state, loading: true })),
    on(loadUserMatchesSuccess, (state, { matches }) => ({
      ...state,
      loading: false,
      matches,
    })),
    on(addMatchToUserMatches, (state, { match }) => {
      const matches =
        state.matches.length > 0 ? state.matches.slice(0, -1) : [];

      return {
        ...state,
        matches: [match, ...matches],
      };
    })
  ),
});

export const { name: authFeatureKey, reducer: authReducer } =
  userMatchesFeature;
