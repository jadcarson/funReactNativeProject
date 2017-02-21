import { EMAIL_CHANGED, PASSWORD_CHANGED, USER_ID } from '../actions/types';

const INITIAL_STATE = { email: '', password: '', user_id: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USER_ID:
      return { ...state, user_id: action.payload };
    default:
      return state;
  }
};
