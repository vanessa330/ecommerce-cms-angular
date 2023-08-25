import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

export interface AuthState {
  token: string | null;
  logginError: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  logginError: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.login, (state, { token }) => {
    return {
      ...state,
      token: token,
      logginError: null,
    };
  }),
  on(authActions.loginFailure, (state, { error }) => {
    return {
      ...state,
      token: null,
      logginError: error,
    };
  }),
  on(authActions.logout, (state) => {
    return {
      ...state,
      token: null,
      logginError: null,
    };
  })
);

// export const selectAuthState = createFeatureSelector<AuthState>('auth');

// export const selectToken = createSelector(
//   selectAuthState,
//   (state) => state.token
// );
