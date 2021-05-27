import { updateCanvas } from "features/canvases/canvasSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';

export default function Settings() {
  const [title, setTitle] = useState<string | number>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { canvasId } = router.query;

  const handleInputChange = event => {
    setTitle(event.target.value);
  }

  const onClickUpdateCanvas = () => {
    dispatch(updateCanvas(canvasId, title));
  };

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
      </div>
    </div>
  );
}