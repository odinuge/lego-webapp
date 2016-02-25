import expect from 'expect';

import auth from '../auth';
import { User } from '../../actions/ActionTypes';

describe('reducers', () => {
  describe('auth', () => {
    it('should have correct initialState', () => {
      const prevState = undefined;
      expect(auth(prevState, {})).toEqual({
        username: null,
        token: null,
        loginFailed: false,
        loggingIn: false
      });
    });

    it('should set loggingIn to true and loginFailed to false while logging in', () => {
      const prevState = undefined;
      const action = { type: User.LOGIN_BEGIN };
      const state = auth(prevState, action);
      expect(state.loggingIn).toBe(true);
      expect(state.loginFailed).toBe(false);
    });

    it('should set loggingIn to false and loginFailed to true when logging in fails', () => {
      const prevState = auth(undefined, { type: User.LOGIN_BEGIN });
      const action = { type: User.LOGIN_FAILURE };
      const state = auth(prevState, action);
      expect(state.loggingIn).toBe(false);
      expect(state.loginFailed).toBe(true);
    });

    it('should set username and token correctly when login succeeds', () => {
      const prevState = auth(undefined, { type: User.LOGIN_BEGIN });
      const action = {
        type: User.LOGIN_SUCCESS,
        payload: {
          token: 'azaz',
          user: {
            username: 'test'
          }
        }
      };
      expect(auth(prevState, action)).toEqual({
        username: action.payload.user.username,
        token: action.payload.token,
        loginFailed: false,
        loggingIn: false
      });
    });

    it('should clear the username and token when logging out', () => {
      const _prevState = auth(undefined, { type: User.LOGIN_BEGIN });
      const _action = {
        type: User.LOGIN_SUCCESS,
        payload: {
          token: 'azaz',
          user: {
            username: 'test'
          }
        }
      };

      const prevState = auth(_prevState, _action);
      const action = { type: User.LOGOUT };
      expect(auth(prevState, action)).toEqual({
        username: null,
        token: null,
        loginFailed: false,
        loggingIn: false
      });
    });
  });
});