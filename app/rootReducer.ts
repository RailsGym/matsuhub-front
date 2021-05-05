import { combineReducers } from '@reduxjs/toolkit'

import loginUserReducer from "../features/loginUser/LoginUserSlice";
import canvasesReducer from '../features/canvases/canvasesSlice';

const rootReducer = combineReducers({
  loginUser: loginUserReducer,
  canvases: canvasesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default  rootReducer
