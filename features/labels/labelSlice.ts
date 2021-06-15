import { createSlice } from '@reduxjs/toolkit';
import { createLabel } from 'api/labelsAPI';
import { patchLabel } from 'api/labelsAPI';
import { AppThunk } from 'app/store';
import { fetchCanvas } from 'features/canvases/canvasSlice';
import toastMessage from 'features/toastMessage/toastMessage';
import { Label } from 'models/labels';

interface LabelState {
  createdLabel: Label | null;
  updatedLabel: Label | null;
}

const initialState: LabelState = {
  createdLabel: null,
  updatedLabel: null
};

const labelSlice = createSlice({
  name: 'label',
  initialState: initialState,
  reducers: {
    createLabelSuccess: (state, action) => {
      state.createdLabel = action.payload;
    },
    createdLabelReset: state => {
      state.createdLabel = null;
    },
    updatedLabelSuccess: (state, action) => {
      state.updatedLabel = action.payload;
    },
  }
});
export default labelSlice.reducer;

export const {
  createLabelSuccess,
  createdLabelReset,
  updatedLabelSuccess
} = labelSlice.actions;

export const newLabel = (title, areaId, canvasId): AppThunk => async dispatch => {
  try {
    const label: Label = await createLabel(title, areaId, canvasId);

    dispatch(createLabelSuccess(label));
    dispatch(fetchCanvas(canvasId))
    toastMessage(['ラベルを作成しました'], 'success');
  } catch (err) {
    console.log(err);
    toastMessage([`ラベル作成に失敗しました　${err}`], 'error');
  }
};

export const updateLabel = (title, areaId, canvasId, labelId, description): AppThunk => async dispatch => {
  try {
    const label: Label = await patchLabel(title, areaId, canvasId, labelId, description);

    dispatch(updatedLabelSuccess(label));
    toastMessage(['ラベルを更新しました'], 'success');
  } catch (err) {
    console.log(err);
    toastMessage([`ラベル更新に失敗しました　${err}`], 'error');
  }
};
