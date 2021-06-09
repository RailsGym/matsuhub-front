import { useEffect } from 'react';
import { useAppDispatch } from 'app/store';
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { fetchCanvas } from 'features/canvases/canvasSlice';
import { useRouter } from 'next/router';
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import Purpose from 'components/areas/Purpose';
import Vision from 'components/areas/Vision';
import Solution from 'components/areas/Solution';
import Superiority from 'components/areas/Superiority';
import Indicator from 'components/areas/Indicator';
import Value from 'components/areas/Value';
import ExplicitPproblem from 'components/areas/ExplicitPproblem';
import ImplicitProblem from 'components/areas/ImplicitProblem';
import Substitute from 'components/areas/Substitute';
import Channel from 'components/areas/Channel';
import Situation from 'components/areas/Situation';
import Trend from 'components/areas/Trend';
import Profit from 'components/areas/Profit';
import Market from 'components/areas/Market';

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
  }, [canvasId]);

  useEffect(() => {
      dispatch(fetchCanvases());
  }, [dispatch]);

  useEffect(() => {
    if (canvasId) {
      dispatch(fetchCanvas(canvasId));
    }
  }, [canvasId]);

  return (
    <div className="flex-grow">
      <h1 className="m-3 font-semibold text-gray-700">仮説キャンバス</h1>
      <table className="w-full mb-6 bc-separate">
        <tbody>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md w-1/2"
              colSpan={3}
            >
              <Purpose number={0} canvas={canvas} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Vision number={1} canvas={canvas} />
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              <Solution number={2} canvas={canvas} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Superiority number={3} canvas={canvas} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              <Indicator number={4} canvas={canvas} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Value number={5} canvas={canvas} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <ExplicitPproblem number={6} canvas={canvas} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <ImplicitProblem number={7} canvas={canvas} />
            </td>
          </tr>
          <tr>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Substitute number={8} canvas={canvas} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Channel number={9} canvas={canvas} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Situation number={10} canvas={canvas} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Trend number={11} canvas={canvas} />
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Profit number={12} canvas={canvas} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Market number={13} canvas={canvas} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
