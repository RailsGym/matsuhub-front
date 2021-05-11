import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from "app/store";
import { getMe } from "api/usersAPI";
import toastMessage from "features/toastMessage/toastMessage";
import { User } from 'models/users';
import Cookie from "universal-cookie";

interface LoginUserState {
  initialized: boolean;
  loginUser: User | null;
}

const initialState: LoginUserState = {
  initialized: false, // 初期化（= ログインユーザーの取得）済みかどうかの判定用
  loginUser: null,
}

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState: initialState,
  reducers: {
    initSuccess: (state, action) => {
      state.initialized = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});
export default loginUserSlice.reducer

// Actions
export const { initSuccess, loginSuccess } = loginUserSlice.actions

export const init = (): AppThunk => async dispatch => {
  const cookie = new Cookie()
  const accessToken = cookie.get('access-token')

  try{
    const user = await getMe();
    if(accessToken && user) {
      dispatch(loginSuccess(user));
    }
  } catch(e) {
    console.error(e);
  }
  dispatch(initSuccess(true));
}

export const login = (email: string, password: string): AppThunk => async dispatch => {

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/auth/sign_in/`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 400) {
          throw "authentication failed";
        } else if (res.ok) {
          const options = { path: "/" };
          const headers = res.headers
          const cookie = new Cookie();
          cookie.set("client", headers.get('client'), options);
          cookie.set("access-token", headers.get('access-token'), options);
          cookie.set("uid", headers.get('uid'), options);
        }
      })
      const user = await getMe();
      if (user) {
        dispatch(loginSuccess(user));
      }
  } catch (err) {
    console.error(err);
    toastMessage([err.message.toString()], 'error');
  }
}