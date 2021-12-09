import { handleErrors, postData } from "../utils/httpUtils";

export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_BEGIN = 'LOGOUT_BEGIN';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const REGISTER_BEGIN = 'REGISTER_BEGIN';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const OPEN_LOGIN = 'OPEN_LOGIN';
export const OPEN_REGISTER = 'OPEN_REGISTER';
export const CHECK_AUTHORIZATION_BEGIN = 'CHECK_AUTHORIZATION_BEGIN';
export const CHECK_AUTHORIZATION_SUCCESS = 'CHECK_AUTHORIZATION_SUCCESS';
export const CHECK_AUTHORIZATION_ERROR = 'CHECK_AUTHORIZATION_ERROR';
export const MARK_TEST_FINISHED = 'MARK_TEST_FINISHED';

export function login(data) {
  return dispatch => {
    dispatch(loginBegin());

    const json = JSON.stringify(data);

    return postData('/Account/Login/', json)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(loginSuccess(data));

        return data;
      })
      .catch(error => dispatch(loginError(error)));
  };
}

export const loginBegin = () => ({
  type: LOGIN_BEGIN,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: { error },
});

export function logout() {
  return dispatch => {
    dispatch(logoutBegin());

    return fetch('/Account/Logout/')
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(logoutSuccess(data));

        return data;
      })
      .catch(error => dispatch(logoutError(error)));
  };
}

export const logoutBegin = () => ({
  type: LOGOUT_BEGIN,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutError = error => ({
  type: LOGOUT_ERROR,
  payload: { error },
});

export function register(data) {
  return dispatch => {
    dispatch(registerBegin());

    const json = JSON.stringify(data);

    return postData('/Account/Register/', json)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(registerSuccess(data));

        return data;
      })
      .catch(error => dispatch(registerError(error)));
  };
}

export function openLogin() {
  return dispatch => {
    dispatch({
      type: OPEN_LOGIN,
    });
  };
}

export function openRegister() {
  return dispatch => {
    dispatch({
      type: OPEN_REGISTER,
    });
  };
}

export function markTestFinished() {
  return dispatch => {
    dispatch({
      type: MARK_TEST_FINISHED,
    });
  };
}

export const registerBegin = () => ({
  type: REGISTER_BEGIN,
});

export const registerSuccess = data => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerError = error => ({
  type: REGISTER_ERROR,
  payload: { error },
});

export function checkAuthorization() {
  return dispatch => {
    dispatch(checkAuthorizationBegin());

    return fetch('/Account/Me/')
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(checkAuthorizationSuccess(data));

        return data;
      })
      .catch(error => dispatch(checkAuthorizationError(error)));
  };
}

export const checkAuthorizationBegin = () => ({
  type: CHECK_AUTHORIZATION_BEGIN,
});

export const checkAuthorizationSuccess = data => ({
  type: CHECK_AUTHORIZATION_SUCCESS,
  payload: data,
});

export const checkAuthorizationError = error => ({
  type: CHECK_AUTHORIZATION_ERROR,
  payload: { error },
});

export const authorizationState = {
  checked: false,
  loggedIn: false,
  userId: null,
  error: null,
  startingLevelTestPassed: false,
  loading: false,
  isRegistering: false,
};

export const authorizationReducer = (state = authorizationState, action) => {
  switch (action.type) {
    case REGISTER_BEGIN:
    case LOGIN_BEGIN:
    case LOGOUT_BEGIN:
    case CHECK_AUTHORIZATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        userId: action.payload.userId,
      };

    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case CHECK_AUTHORIZATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        userId: null,
      };

    case OPEN_LOGIN:
      return {
        ...state,
        isRegistering: false,
      };

    case OPEN_REGISTER:
      return {
        ...state,
        isRegistering: true,
      };

    case MARK_TEST_FINISHED:
      return {
        ...state,
        startingLevelTestPassed: true,
      };

    case CHECK_AUTHORIZATION_SUCCESS:
      const { userId, loggedIn, startingLevelTestPassed } = action.payload;

      return {
        ...state,
        checked: true,
        loggedIn,
        startingLevelTestPassed,
        userId: loggedIn ? userId : null,
      };

    default:
      return state;
  }
}
