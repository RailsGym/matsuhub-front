import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCanvas } from "api/canvasesAPI";

import { AppThunk } from "app/store";
import { Canvas } from "models/canvases";
import toastMessage from "features/toastMessage/toastMessage";

type CanvasListState = Canvas;

let initialState: CanvasListState = null as CanvasListState;

const canvasSlice = createSlice({
  name: "canvas",
  initialState: initialState,
  reducers: {
    createCanvasSuccess(state, { payload }: PayloadAction<Canvas>) {
      return payload;
    }
  }
});

export const { createCanvasSuccess } = canvasSlice.actions;

export default canvasSlice.reducer;

export const newCanvas = (title): AppThunk => async dispatch => {
  try {
    const canvas: Canvas = await createCanvas(title);

    dispatch(createCanvasSuccess(canvas));
    toastMessage(["キャンバスを作成しました"], "success");
  } catch (err) {
    // ここでAPIのレスポンスからエラーメッセージを取得する
    console.log(err.toString());
    toastMessage(["キャンバス作成に失敗しました"], "error");
  }
};
