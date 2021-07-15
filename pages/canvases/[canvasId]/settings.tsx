import { destroyCanvas, fetchCanvas, updateCanvas } from 'features/canvases/canvasSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { destroyedCanvasReset } from 'features/canvases/canvasSlice';

export default function Settings() {
  const [title, setTitle] = useState<string | number>();
  const canvases = useSelector((state: RootState) => state.canvases);
  const { canvas } = useSelector((state: RootState) => state.canvas);
  const { destroyedCanvas } = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();
  const router = useRouter();
  const { canvasId } = router.query;

  useEffect(() => {
    if (canvas) {
      setTitle(canvas.title);
    }
  }, [])

  useEffect(() => {
    dispatch(fetchCanvases());
  }, [dispatch]);

  useEffect(() => {
    if (destroyedCanvas) {
      if (canvases.length === 1) {
        router.push('/canvases/new');
      } else {
        const createdCanvases = canvases.filter(function(createdCanvas) {
          return createdCanvas.id != destroyedCanvas.id;
        });
        const lastCreatedCanvasId =
          createdCanvases[createdCanvases.length - 1].id;
        router.push(`/canvases/${lastCreatedCanvasId}`);
      }
      dispatch(destroyedCanvasReset());
    }
  }, [destroyedCanvas]);

  const handleInputChange = event => {
    setTitle(event.target.value);
  }

  const onClickUpdateCanvas = () => {
    dispatch(updateCanvas(canvasId, title));
  };

  const onClickCanvasDelete = () => {
    if (confirm(
      'キャンバスを削除すると復元することができません。本当に削除しますか?'
    )) {
      dispatch(destroyCanvas(canvasId));
    }
  }

  return (
    <div className="m-5 flex-grow">
      <h2 className="font-semibold text-gray-700">設定</h2>
      <div className="mt-4 ml-4">
        <h3 className="mb-5 font-semibold text-gray-700 border-bottom-solid border-b">
          キャンバス設定
        </h3>
        <h4 className="mb-1">キャンバス名</h4>
        <div className="flex">
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            className="mr-3 h-8 w-1/2 border-gray-400 rounded-md"
          />
          <button
            id="updateLabelTitle"
            onClick={onClickUpdateCanvas}
            className="h-8 w-1/12 rounded-md bg-customgreen text-white text-sm hover:text-customhovercolor hover:bg-customhoverbackground hover: outline-none focus:outline-none"
          >
            更新する
          </button>
        </div>
        <hr className="my-10 w-2/3 font-semibold text-gray-700 border-bottom-solid border-b" />
        <button
          onClick={onClickCanvasDelete}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto sm:text-sm"
        >
          キャンバスを削除
        </button>
      </div>
    </div>
  );
}