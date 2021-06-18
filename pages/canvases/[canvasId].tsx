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
  const updatedLabel = useSelector((state: RootState) => state.label);
  const createdLabel = useSelector((state: RootState) => state.label);
  const { canvasId } = router.query;

  useEffect(() => {
    dispatch(fetchCanvases());
  }, [dispatch]);

  useEffect(() => {
    if (canvasId) {
      dispatch(fetchCanvas(canvasId));
    }
  }, [canvasId, createdLabel, updatedLabel]);

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
              {
                canvas && (<Area area={canvas.areas[0]} labels={canvas.areas[0].labels} type={'landscape'} />)
              }
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              {
                canvas && (<Area area={canvas.areas[1]} labels={canvas.areas[1].labels} type={'landscape'} />)
              }
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              {
                canvas && (<Area area={canvas.areas[2]} labels={canvas.areas[2].labels} type={'portrait'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area area={canvas.areas[3]} labels={canvas.areas[3].labels} type={'square'} />)
              }
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              {
                canvas && (<Area area={canvas.areas[4]} labels={canvas.areas[4].labels} type={'portrait'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area area={canvas.areas[5]} labels={canvas.areas[5].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area area={canvas.areas[6]} labels={canvas.areas[6].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area area={canvas.areas[7]} labels={canvas.areas[7].labels} type={'square'} />)
              }
            </td>
          </tr>
          <tr>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area area={canvas.areas[8]} labels={canvas.areas[8].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area area={canvas.areas[9]} labels={canvas.areas[9].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area area={canvas.areas[10]} labels={canvas.areas[10].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area area={canvas.areas[11]} labels={canvas.areas[11].labels} type={'square'} />)
              }
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              {
                canvas && (<Area area={canvas.areas[12]} labels={canvas.areas[12].labels} type={'landscape'} />)
              }
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              {
                canvas && (<Area area={canvas.areas[13]} labels={canvas.areas[13].labels} type={'landscape'} />)
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
