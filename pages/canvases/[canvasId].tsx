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
              {
                canvas && (<Area number={0} areas={canvas.areas} labels={canvas.areas[0].labels} areaId={canvas.areas[0].id} type={'landscape'} />)
              }
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              {
                canvas && (<Area number={1} areas={canvas.areas} areaId={canvas.areas[1].id} labels={canvas.areas[1].labels} type={'landscape'} />)
              }
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              {
                canvas && (<Area number={2} areas={canvas.areas} areaId={canvas.areas[2].id} labels={canvas.areas[2].labels} type={'portrait'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area number={3} areas={canvas.areas} areaId={canvas.areas[3].id} labels={canvas.areas[3].labels} type={'square'} />)
              }
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              {
                canvas && (<Area number={4} areas={canvas.areas} areaId={canvas.areas[4].id} labels={canvas.areas[4].labels} type={'portrait'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area number={5} areas={canvas.areas} areaId={canvas.areas[5].id} labels={canvas.areas[5].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area number={6} areas={canvas.areas} areaId={canvas.areas[6].id} labels={canvas.areas[6].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              {
                canvas && (<Area number={7} areas={canvas.areas} areaId={canvas.areas[7].id} labels={canvas.areas[7].labels} type={'square'} />)
              }
            </td>
          </tr>
          <tr>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area number={8} areas={canvas.areas} areaId={canvas.areas[8].id} labels={canvas.areas[8].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area number={9} areas={canvas.areas} areaId={canvas.areas[9].id} labels={canvas.areas[9].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area number={10} areas={canvas.areas} areaId={canvas.areas[10].id} labels={canvas.areas[10].labels} type={'square'} />)
              }
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              {
                canvas && (<Area number={11} areas={canvas.areas} areaId={canvas.areas[11].id} labels={canvas.areas[11].labels} type={'square'} />)
              }
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              {
                canvas && (<Area number={12} areas={canvas.areas} areaId={canvas.areas[12].id} labels={canvas.areas[12].labels} type={'landscape'} />)
              }
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              {
                canvas && (<Area number={13} areas={canvas.areas} areaId={canvas.areas[13].id} labels={canvas.areas[13].labels} type={'landscape'} />)
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
