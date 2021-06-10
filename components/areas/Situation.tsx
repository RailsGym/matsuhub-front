import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useState, Fragment } from 'react';
import { useAppDispatch } from 'app/store';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import { newLabel } from 'features/labels/labelSlice';

export default function Situation(props) {
  const [canvasMenuOpen, setCanvasMenuOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string | number>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { canvasId } = router.query;
  const { number, canvas } = props
  const areaId = number + 1;

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
          {canvas ? canvas["areas"][number]["area_type_text"] : null}
        </label>
        <AiFillQuestionCircle style={IconStyle} />
        <AiFillPlusCircle style={IconStyle} aria-hidden="true" />
      </div>
      {!canvasMenuOpen && canvas && !canvas["areas"][number]["labels"].length && (
        <p className="text-gray-400 font-semibold text-xs">
          {canvas ? canvas["areas"][number]["description"] : null}
        </p>
      )}
      <div className="flex flex-wrap">
        {canvas ? (
          <>
            {canvas["areas"][number]["labels"].map(item => (
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
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
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
                className="border-gray-400 rounded-md mr-2 w-full"
              />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
};