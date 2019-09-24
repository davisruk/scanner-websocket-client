import { Action } from '@ngrx/store';

export const appFeatureKey = 'app';

export interface State {
  name: string;
}

export const initialState: State = {
  name: 'Web Socket Test'
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}
