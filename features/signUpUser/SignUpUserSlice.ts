import {AppThunk} from "../../app/store";
import {createUser} from "../../api/usersAPI";
import toastMessage from "../toastMessage/toastMessage";
import {createSlice} from "@reduxjs/toolkit";

interface SignUpUserState {
  signedUpUser: boolean | null;
}

const initialState: SignUpUserState = {
  signedUpUser: null,
}

const signUpUserSlice = createSlice({
  name: 'signUpUser',
  initialState: initialState,
  reducers: {
    signUpSuccess: (state, action) => {
      state.signedUpUser = action.payload;
    },
  },
});
export default signUpUserSlice.reducer

// Actions
export const { signUpSuccess } = signUpUserSlice.actions

export const signUp = (email: string, username: string, password: string): AppThunk => async dispatch => {

  try {
    const created: boolean = await createUser(email, username, password);
    if (created) {
      dispatch(signUpSuccess(true));
    }
  } catch (err) {
    console.error(err);
    toastMessage([err.toString()], 'error');
  }
}