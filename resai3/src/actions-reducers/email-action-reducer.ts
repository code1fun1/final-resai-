import { createReducer, createAction } from '@reduxjs/toolkit';

export const emailAction = createAction("AUTH.LOGIN");

export const authReducer = createReducer({}, (builder) => {
    builder
      .addCase(emailAction, (state, action) => {
        state.loginMsg = true;
        state.loginResponse = action.payload;
      })
      .addDefaultCase((state) => state);
});
