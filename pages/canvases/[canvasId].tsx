import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';

export default function CanvasShow() {
  
  const BorderSpacingStyle = {
    borderCollapse: "separate",
    borderSpacing: "4px"
  }

  const IconStyle = {
    fontSize: "27px",
    color: "#D8D8D8",
    marginRight: "4px",
    marginBottom: "4px"
  };

  return (
    <div className="flex-grow">
      <h1 className="m-3 font-semibold text-gray-700">仮説キャンバス</h1>
      <table className="h-screen w-full mb-6" style={BorderSpacingStyle}>
        <tbody>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/2"
              colspan="3"
            >
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colspan="3"
            >
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowspan="2"
            >
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6"
              rowspan="2"
            >
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto w-1/6">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td className="relative bg-gray-100 border border-gray-150 rounded-md h-auto">
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colspan="3"
            >
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
            <td
              className="relative bg-gray-100 border border-gray-150 rounded-md h-auto"
              colspan="3"
            >
              <div className="absolute left-3 top-3">
                <div className="flex mb-3">
                  <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
                    目的
                  </label>
                  <AiFillQuestionCircle style={IconStyle} />
                  <AiFillPlusCircle style={IconStyle} />
                </div>
                <p className="text-gray-400 font-semibold text-xs">
                  なぜ、この事業・サービスをやるのか
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
