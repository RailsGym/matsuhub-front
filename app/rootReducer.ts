import { combineReducers } from "@reduxjs/toolkit";

import loginUserReducer from "features/loginUser/LoginUserSlice";
import canvasesReducer from "features/canvases/canvasesSlice";
import canvasReducer from "features/canvases/canvasSlice";

const rootReducer = combineReducers({
  loginUser: loginUserReducer,
  canvases: canvasesReducer,
  canvas: canvasReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
