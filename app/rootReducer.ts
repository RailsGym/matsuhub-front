import { combineReducers } from '@reduxjs/toolkit'

import canvasesReducer from '../features/canvases/canvasesSlice';

const rootReducer = combineReducers({
  canvases: canvasesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default  rootReducer
