import { combineReducers } from '@reduxjs/toolkit'

import loginUserReducer from "features/loginUser/LoginUserSlice";
import signUpUserReducer from "features/signUpUser/SignUpUserSlice";
import canvasesReducer from 'features/canvases/canvasesSlice';

const rootReducer = combineReducers({
  loginUser: loginUserReducer,
  canvases: canvasesReducer,
  signedUpUser: signUpUserReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default  rootReducer
