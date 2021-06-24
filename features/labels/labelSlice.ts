import { createSlice } from '@reduxjs/toolkit';
import { createLabel, deleteLabel } from 'api/labelsAPI';
import { patchLabel } from 'api/labelsAPI';
import { AppThunk } from 'app/store';
import toastMessage from 'features/toastMessage/toastMessage';
import { Label } from 'models/labels';

interface LabelState {
  createdLabel: Label | null;
  updatedLabel: Label | null;
  destroyedLabel: Label | null;
}

const initialState: LabelState = {
  createdLabel: null,
  updatedLabel: null,
  destroyedLabel: null
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
    destroyLabelSuccess: (state, action) => {
      state.destroyedLabel = action.payload;
    }
  }
});
export default labelSlice.reducer;

export const {
  createLabelSuccess,
  createdLabelReset,
  updatedLabelSuccess,
  destroyLabelSuccess
} = labelSlice.actions;

export const newLabel = (title, areaId, canvasId): AppThunk => async dispatch => {
  try {
    const label: Label = await createLabel(title, areaId, canvasId);

    dispatch(createLabelSuccess(label));
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

export const destroyLabel = (canvasId, labelId): AppThunk => async dispatch => {
  try {
    const label: Label = await deleteLabel(canvasId, labelId);

    dispatch(destroyLabelSuccess(label));
    toastMessage(['ラベルを削除しました'], 'success');
  } catch (err) {
    console.log(err);
    toastMessage([`ラベル削除に失敗しました　${err}`], 'error');
  }
};