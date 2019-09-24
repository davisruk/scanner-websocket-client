import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromApp from './app.reducer';

export interface State {
  [fromApp.appFeatureKey]: fromApp.State;
}

const initialState: State = {
  [fromApp.appFeatureKey]: fromApp.initialState
};

export const reducers: ActionReducerMap<State> = {
  [fromApp.appFeatureKey]: fromApp.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
