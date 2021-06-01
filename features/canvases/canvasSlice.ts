import { createSlice} from '@reduxjs/toolkit';
import { createCanvas, patchCanvas, deleteCanvas } from 'api/canvasesAPI';
import { getCanvas } from 'api/canvasesAPI';
import { AppThunk } from 'app/store';
import { Canvas } from 'models/canvases';
import toastMessage from 'features/toastMessage/toastMessage';

interface CanvasState {
  createdCanvas: Canvas | null;
  updatedcanvas: Canvas | null;
  canvas: Canvas | null;
}

const initialState: CanvasState = {
  createdCanvas: null,
  updatedcanvas: null,
  canvas: null
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: initialState,
  reducers: {
    createCanvasSuccess: (state, action) => {
      state.createdCanvas = action.payload;
    },
    createdCanvasReset: state => {
      state.createdCanvas = undefined;
    },
    getCanvasSuccess: (state, action) => {
      state.canvas = action.payload;
    },
    updateCanvasSuccess: (state, action) => {
      state.canvas = action.payload;
    },
    destroyCanvasSuccess: (state, action) => {
      state.canvas = undefined;
    }
  }
});
export default canvasSlice.reducer;

export const {
         createCanvasSuccess,
         getCanvasSuccess,
         createdCanvasReset,
         updateCanvasSuccess,
         destroyCanvasSuccess
       } = canvasSlice.actions;

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

export const fetchCanvas = (canvasId): AppThunk => async dispatch => {
  try {
    const canvas: Canvas = await getCanvas(canvasId);

    dispatch(getCanvasSuccess(canvas));
  } catch (err) {
    console.log(err);
    toastMessage(
      [`キャンバス情報の取得に失敗しました　${err}`],
      'error'
    );
  }
};

export const updateCanvas = (canvasId, title): AppThunk => async dispatch => {
  try {
    const canvas: Canvas = await patchCanvas(canvasId, title);

    dispatch(updateCanvasSuccess(canvas));
    toastMessage(['キャンバスを更新しました'], 'success');
  } catch (err) {
    console.log(err);
    toastMessage([`キャンバス更新に失敗しました　${err}`], 'error');
  }
};

export const destroyCanvas = (canvasId): AppThunk => async dispatch => {
  try {
    const canvas: Canvas = await deleteCanvas(canvasId);

    dispatch(destroyCanvasSuccess(canvas));
    toastMessage(['キャンバスを削除しました'], 'success');
  } catch (err) {
    console.log(err);
    toastMessage([`キャンバス削除に失敗しました　${err}`], 'error');
  }
};