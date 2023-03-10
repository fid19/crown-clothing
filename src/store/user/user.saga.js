import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signOutSuccess,
} from "./user.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  createAuthUserWIthEmailAndPassword,
  signInWithGooglePopup,
  signInWithNativeEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { alertError } from "../../components/sign-up-form/sign-up-form.component";

export function* getSnapshotFromUserAuth(userAuth, additonalDetails) {
  try {
    console.log(additonalDetails);
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additonalDetails
    );

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield call(alertError, error);
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield call(alertError, error);
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield call(alertError, error);
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInWithEmail({ payload }) {
  try {
    const { email, password } = payload;

    const { user } = yield call(
      signInWithNativeEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield call(alertError, error);
    yield put(signInFailed(error));
  }
}

export function* signUpWithEmail({ payload }) {
  try {
    const { email, password, displayName } = payload;
    const { user } = yield call(
      createAuthUserWIthEmailAndPassword,
      email,
      password
    );
    console.log(user);

    yield call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    yield call(alertError, error);
    yield put(signUpFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUpWithEmail);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
