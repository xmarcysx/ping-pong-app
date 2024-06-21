import { createSelector } from '@ngrx/store';
import { AppState } from '../store';

export const selectFeature = (state: AppState) => state.userMatches;

export const selectMatches = createSelector(selectFeature, (state) => state);
