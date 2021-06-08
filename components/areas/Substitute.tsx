import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { fetchCanvas } from 'features/canvases/canvasSlice';
import { RootState } from 'app/rootReducer';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import { newLabel } from 'features/labels/labelSlice';

export default function Substitute(props) {
  const [canvasMenuOpen, setCanvasMenuOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string | number>();
  const { canvas } = useSelector((state: RootState) => state.canvas);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { canvasId } = router.query;
  const areaId = props.number + 1;

  useEffect(() => {
    dispatch(fetchCanvases());
  }, [dispatch]);

  useEffect(() => {
    if (canvasId) {
      dispatch(fetchCanvas(canvasId));
    }
  }, [canvasId]);

  const togglePopoverCanvasMenuOpen = () => {
    setCanvasMenuOpen(!canvasMenuOpen);
  };

  const handleInputChange = event => {
    setTitle(event.target.value);
  };

  const IconStyle = {
    fontSize: "27px",
    color: "#D8D8D8",
    marginRight: "4px",
    marginBottom: "4px"
  };

  const areaFlame = {
    minHeight: "200px",
    padding: "8px"
  }

  return (
    <Popover onClick={togglePopoverCanvasMenuOpen} style={areaFlame}>
      <div className="flex w-auto mb-2">
        <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
          {canvas ? canvas["areas"][props.number]["area_type_text"] : null}
        </label>
        <AiFillQuestionCircle style={IconStyle} />
        <AiFillPlusCircle style={IconStyle} aria-hidden="true" />
      </div>
      {!canvasMenuOpen && canvas && !canvas["areas"][props.number]["labels"].length && (
        <p className="text-gray-400 font-semibold text-xs">
          {canvas ? canvas["areas"][props.number]["description"] : null}
        </p>
      )}
      <div className="flex flex-wrap">
        {canvas ? (
          <>
            {canvas["areas"][props.number]["labels"].map(item => (
              <div className="grid gap-6 bg-white sm:gap-5 sm:p-2 border-l-4 border-customgreen w-full rounded-md text-sm m-1" key={item.id}>
                <p>
                  {item.title}
                </p>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <Transition
        show={canvasMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-50"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-50"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="transform">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden w-full">
            <div className="grid gap-6 bg-white sm:gap-5 sm:p-2 border-l-4 border-customgreen">
              <input
                type="text"
                autoFocus={true}
                onChange={handleInputChange}
                onKeyPress={e => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                    dispatch(newLabel(title, areaId, canvasId))
                    togglePopoverCanvasMenuOpen()
                  }
                }}
                className="border-gray-400 rounded-md mr-2"
              />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
};