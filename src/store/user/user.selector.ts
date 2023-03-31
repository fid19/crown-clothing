import { createSelector } from "reselect";

import { USERS } from "./user.reducer";
import { RootState } from "../store";

export const selectUserReducer = (state: RootState): USERS => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);

export const selectIsLoading = createSelector(
  [selectUserReducer],
  (user) => user.isLoading
);

export const selectUserError = createSelector(
  [selectUserReducer],
  (user) => user.error
);
