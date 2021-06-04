import { combineReducers } from '@reduxjs/toolkit';

import loginUserReducer from 'features/loginUser/LoginUserSlice';
import signUpUserReducer from 'features/signUpUser/SignUpUserSlice';
import canvasesReducer from 'features/canvases/canvasesSlice';
import canvasReducer from 'features/canvases/canvasSlice';
import labelReducer from 'features/labels/labelSlice';

const rootReducer = combineReducers({
  loginUser: loginUserReducer,
  canvases: canvasesReducer,
  signedUpUser: signUpUserReducer,
  canvas: canvasReducer,
  label: labelReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
