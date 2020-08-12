import {
  MetaReducer,
  combineReducers,
  Action,
  ActionReducerMap,
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import * as fromApp from "./app.reducer";

export interface State {
  [fromApp.appFeatureKey]: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromApp.appFeatureKey]: fromApp.reducer,
};

/*
export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    [fromApp.appFeatureKey]: fromApp.reducer,
  })(state, action);
}
*/
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
