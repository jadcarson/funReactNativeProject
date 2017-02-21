//import { Actions } from 'react-native-router-flux';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  USER_ID 
  // LOGIN_USER_SUCCESS, 
  // LOGIN_USER_FAIL, 
  } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
    };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
    };
};

export const userID = (id) => {
  return {
    type: USER_ID,
    payload: id
  };
};

// const loginUserFail = (dispatch) => {
//   dispatch({ type: LOGIN_USER_FAIL });
// };

// const loginUserSuccess = (dispatch, user) => {
//   dispatch({
//     type: LOGIN_USER_SUCCESS,
//     payload: user
//   });

//   Actions.main();
// };
