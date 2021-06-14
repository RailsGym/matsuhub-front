import { useEffect } from 'react';
import { useAppDispatch } from 'app/store';
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { fetchCanvas } from 'features/canvases/canvasSlice';
import { useRouter } from 'next/router';
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import Area from 'components/Area';

export default function CanvasShow() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { canvas } = useSelector((state: RootState) => state.canvas);
  const { canvasId } = router.query;

  useEffect(() => {
    dispatch(fetchCanvases());
  }, [dispatch]);

  useEffect(() => {
    if (canvasId) {
      dispatch(fetchCanvas(canvasId));
    }
  }, [canvasId, dispatch]);

  return (
    <div className="w-full">
      <h1 className="m-3 font-semibold text-gray-700">仮説キャンバス</h1>
      <table className="mb-6 bc-separate">
        <tbody>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md w-1/2"
              colSpan={3}
            >
              <Area number={0} canvas={canvas} type={'landscape'} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Area number={1} canvas={canvas} type={'landscape'} />
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              <Area number={2} canvas={canvas} type={'portrait'} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Area number={3} canvas={canvas} type={'square'} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              <Area number={4} canvas={canvas} type={'portrait'} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Area number={5} canvas={canvas} type={'square'} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Area number={6} canvas={canvas} type={'square'} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Area number={7} canvas={canvas} type={'square'} />
            </td>
          </tr>
          <tr>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Area number={8} canvas={canvas} type={'square'} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Area number={9} canvas={canvas} type={'square'} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Area number={10} canvas={canvas} type={'square'} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Area number={11} canvas={canvas} type={'square'} />
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Area number={12} canvas={canvas} type={'landscape'} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Area number={13} canvas={canvas} type={'landscape'} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
