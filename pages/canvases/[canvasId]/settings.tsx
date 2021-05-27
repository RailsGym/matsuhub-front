export default function Settings() {
  return (
    <div className="m-5 flex-grow">
      <h2 className="font-semibold text-gray-700">設定</h2>
      <div className="mt-4 ml-4">
        <h3 className="mb-5 font-semibold text-gray-700 border-bottom-solid border-b">
          キャンバス 設定
        </h3>
        <h4 className="mb-1">キャンバス名</h4>
        <input
          type="text"
          className="mr-3 h-8 w-1/2 border-gray-400 rounded-md"
        />
        <button className="h-8 w-1/12 rounded-md bg-customgreen text-white text-sm hover:text-customhovercolor hover:bg-customhoverbackground hover: outline-none focus:outline-none">
          更新する
        </button>
      </div>
    </div>
  );
}