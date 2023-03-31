import { UserData } from "../../utils/firebase/firebase.utils";
import {
  emailSignInStart,
  emailSignUpStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";
import { AnyAction } from "redux";

export type USERS = {
  readonly currentUser: null | UserData;
  readonly isLoading: boolean;
  readonly error: null | Error;
};

const INITIAL_STATE: USERS = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      currentUser: action.payload,
    };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  if (
    signOutStart.match(action) ||
    emailSignUpStart.match(action) ||
    emailSignInStart.match(action)
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      currentUser: null,
    };
  }

  return state;
};
