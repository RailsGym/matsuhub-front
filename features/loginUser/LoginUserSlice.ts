import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from "app/store";
import { getMe, createSession } from "api/usersAPI";
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
    const user: User | null = await createSession(email, password);
    if (user) {
      dispatch(loginSuccess(user));
    }
  } catch (err) {
    console.error(err);
    toastMessage(['メールアドレスまたはパスワードが正しくありません。'], 'error');
  }
}