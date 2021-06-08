import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { fetchCanvas } from 'features/canvases/canvasSlice';
import { RootState } from 'app/rootReducer';
import { useRouter } from 'next/router';
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
  const { canvas } = useSelector((state: RootState) => state.canvas);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { canvasId } = router.query;

  useEffect(() => {
      dispatch(fetchCanvases());
  }, [dispatch]);

  useEffect(() => {
    if (canvasId) {
      dispatch(fetchCanvas(canvasId));
    }
  }, [canvasId]);

  const IconStyle = {
    fontSize: "27px",
    color: "#D8D8D8",
    marginRight: "4px",
    marginBottom: "4px"
  };

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
              <Purpose number={0} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Vision number={1} />
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              <Solution number={2} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Superiority number={3} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowSpan={2}
            >
              <Indicator number={4} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <Value number={5} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <ExplicitPproblem number={6} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <ImplicitProblem number={7} />
            </td>
          </tr>
          <tr>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Substitute number={8} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Channel number={9} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Situation number={10} />
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <Trend number={11} />
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Profit number={12} />
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colSpan={3}
            >
              <Market number={13} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
