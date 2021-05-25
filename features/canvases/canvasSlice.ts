import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCanvas } from 'api/canvasesAPI';
import { getCanvas } from 'api/canvasesAPI';

import { AppThunk } from 'app/store';
import { Canvas } from 'models/canvases';
import toastMessage from 'features/toastMessage/toastMessage';

type CanvasState = Canvas;

let initialState: CanvasState = null as CanvasState;

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: initialState,
  reducers: {
    createCanvasSuccess(state, { payload }: PayloadAction<Canvas>) {
      return payload;
    },
    getCanvasSuccess(state, { payload }: PayloadAction) {
      return payload;
    }
  }
});

export const { createCanvasSuccess } = canvasSlice.actions;
export const { getCanvasSuccess } = canvasSlice.actions;

export const newCanvas = (title): AppThunk => async dispatch => {
  try {
    const canvas: Canvas = await createCanvas(title);

    dispatch(createCanvasSuccess(canvas));
    toastMessage(['キャンバスを作成しました'], 'success');
  } catch (err) {
    console.log(err);
    toastMessage([`キャンバス作成に失敗しました　${err}`], 'error');
  }
};

export const showCanvas = (): AppThunk => async dispatch => {
  try {
    const canvas = await getCanvas();

    dispatch(getCanvasSuccess(canvas));
  } catch (err) {
    console.log(err);
    toastMessage([`キャンバス情報の取得に失敗しました　${err}`], 'error');
  }
};

export default canvasSlice.reducer;