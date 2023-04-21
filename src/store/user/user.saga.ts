import { takeLatest, put, all, call } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signOutSuccess,
  EmailSignInStart,
  EmailSignUpStart,
} from "./user.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  createAuthUserWIthEmailAndPassword,
  signInWithGooglePopup,
  signInWithNativeEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";
import { alertError } from "../../components/sign-up-form/sign-up-form.component";
import { AuthError, AuthErrorCodes, User } from "firebase/auth";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additonalDetails?: AdditionalInformation
) {
  try {
    console.log(additonalDetails);
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additonalDetails
    );

    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error: any) {
    yield* call(alertError, error);
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);

    yield* call(getSnapshotFromUserAuth, user);
  } catch (error: any) {
    yield* call(alertError, error);
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error: any) {
    yield* call(alertError, error);
    yield* put(signInFailed(error as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInWithEmail({ payload }: EmailSignInStart) {
  try {
    const { email, password } = payload;

    const userCredential = yield* call(
      signInWithNativeEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error: any) {
    yield* call(alertError, error);
    yield* put(signInFailed(error as Error));
  }
}

export function* signUpWithEmail({ payload }: EmailSignUpStart) {
  try {
    const { email, password, displayName } = payload;
    const userCredential = yield* call(
      createAuthUserWIthEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user, { displayName });
    }
  } catch (error: any) {
    yield* call(alertError, error);
    yield* put(signUpFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUpWithEmail);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
