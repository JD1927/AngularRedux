import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  State,
  Action
} from '@ngrx/store';

import { RouterStateUrl } from '../../shared/utilities/utils';

import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAuth from '../../auth/store/reducers/auth.reducers';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AppState {
  auth: fromAuth.AuthState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State<any>|any> = {
  auth: fromAuth.authReducer,
  router: fromRouter.routerReducer
};

export function logger(reducer: ActionReducer<State<any>>) {
  // tslint:disable-next-line:only-arrow-functions
  return function(state: State<any>, action: any): State<any> {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State<any>>[] = !environment.production ?
  [logger, storeFreeze] : [];

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const getAuth = createSelector(
  getAuthState,
  fromAuth.getAuthState
);


