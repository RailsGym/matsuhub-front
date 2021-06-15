import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useState, Fragment } from 'react';
import { useAppDispatch } from 'app/store';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import { newLabel, updateLabel } from 'features/labels/labelSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Area(props) {
  const [canvasMenuOpen, setCanvasMenuOpen] = useState<boolean>(false);
  const [labelMenuOpen, setLabelMenuOpen] = useState<boolean>(false);
  const [labelID, setLabelID] = useState();
  const [title, setTitle] = useState<string | number>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { canvasId } = router.query;
  const { number, canvas, type } = props
  const areaId = number + 1;

  const togglePopoverCanvasMenuOpen = () => {
    setCanvasMenuOpen(!canvasMenuOpen);
  };

  const togglePopoverlabelMenuOpen = (item) => {
    setLabelID(item.id)
    setLabelMenuOpen(!labelMenuOpen);
  };

  const handleInputChange = event => {
    setTitle(event.target.value);
  };

  return (
    <Popover className={classNames(
      type === 'landscape' ? "landscape-flame" : type === 'square' ? "square-flame" : "portrait-flame", "p-2"
    )}
    >
      <div className="flex mb-2">
        <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
          {canvas ? canvas["areas"][number]["area_type_text"] : null}
        </label>
        <AiFillQuestionCircle className="area-icon" />
        <AiFillPlusCircle className="area-icon" aria-hidden="true" onClick={togglePopoverCanvasMenuOpen}/>
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
              <div onClick={() => togglePopoverlabelMenuOpen(item)} className={classNames(
                type === 'landscape' ? "w-1/4" : "w-full", "grid gap-6 bg-white sm:gap-5 sm:p-2 border-l-4 border-customgreen w-1/4 rounded-md text-sm m-1"
              )} key={item.id}>
                {labelID == item.id && !labelMenuOpen ?
                  (
                    <input
                      type="text"
                      autoFocus={true}
                      onChange={handleInputChange}
                      onKeyPress={e => {
                        if (e.key == "Enter") {
                          e.preventDefault();
                          dispatch(updateLabel(title, areaId, canvasId, item.id, ""))
                          setLabelMenuOpen(!labelMenuOpen)
                        }
                      }}
                    className="border-gray-400 rounded-md w-full"
                  />)
                  :(
                    <p>
                      {item.title}
                    </p>
                  )}
              </div>
            ))}
          </>
        ) : null}
      </div>
      <Transition
        show={canvasMenuOpen}
        as={Fragment}
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
