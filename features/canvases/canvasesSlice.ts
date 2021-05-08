import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCanvases } from "api/canvasesAPI";

import { AppThunk } from 'app/store'
import { Canvas } from "models/canvases";
import toastMessage from "features/toastMessage/toastMessage";

type CanvasListState = Canvas[] | null

let initialState: CanvasListState = null as CanvasListState

const canvasesSlice = createSlice({
  name: 'canvas',
  initialState: initialState,
  reducers: {
    getCanvasesSuccess(state, { payload }: PayloadAction<Canvas[]>) {
      return payload;
    }
  }
});

export const {
  getCanvasesSuccess
} = canvasesSlice.actions

export default canvasesSlice.reducer

export const fetchCanvases = (): AppThunk => async dispatch => {
  try {
    const canvases: Canvas[]|null = await getCanvases();
    if (canvases === null) return;

    dispatch(getCanvasesSuccess(canvases))
  } catch (err) {
    console.log(err.toString())
    toastMessage(['キャンバス一覧の取得に失敗しました'], 'error')
  }
}