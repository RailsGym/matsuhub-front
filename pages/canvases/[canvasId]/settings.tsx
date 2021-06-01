import { destroyCanvas, fetchCanvas, updateCanvas } from 'features/canvases/canvasSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchCanvases } from 'features/canvases/canvasesSlice';

export default function Settings() {
  const [title, setTitle] = useState<string | number>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { canvasId } = router.query;

  useEffect(() => {
    dispatch(fetchCanvases());
  }, [dispatch]);

  const handleInputChange = event => {
    setTitle(event.target.value);
  }

  const onClickUpdateCanvas = () => {
    dispatch(updateCanvas(canvasId, title));
    dispatch(fetchCanvas(canvasId));
  };

  const onClickCanvasDelete = () => {
    if (confirm(
      'キャンバスを削除すると復元することができません。本当に削除しますか?'
    )) {
      dispatch(destroyCanvas(canvasId));
      router.push( '/canvases/new');
    }
  }

  return (
    <div className="m-5 flex-grow">
      <h2 className="font-semibold text-gray-700">設定</h2>
      <div className="mt-4 ml-4">
        <h3 className="mb-5 font-semibold text-gray-700 border-bottom-solid border-b">
          キャンバス 設定
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
            onClick={onClickUpdateCanvas}
            className="h-8 w-1/12 rounded-md bg-customgreen text-white text-sm hover:text-customhovercolor hover:bg-customhoverbackground hover: outline-none focus:outline-none"
          >
            更新する
          </button>
        </div>
        <hr className="my-10 w-2/3 font-semibold text-gray-700 border-bottom-solid border-b" />
        <button
          onClick={onClickCanvasDelete}
          className="text-blue-500 hover: outline-none hover:text-blue-500 hover:underline focus:outline-none"
        >
          キャンバスを削除
        </button>
      </div>
    </div>
  );
}