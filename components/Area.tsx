import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useState, Fragment } from 'react';
import { useAppDispatch } from 'app/store';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import { newLabel, updateLabel } from 'features/labels/labelSlice';
import { fetchCanvas } from 'features/canvases/canvasSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Area(props) {
  const [canvasMenuOpen, setCanvasMenuOpen] = useState<boolean>(false);
  const [labelMenuOpen, setLabelMenuOpen] = useState<boolean>(false);
  const [labelID, setLabelID] = useState<number>();
  const [createdLabelTitle, setCreatedLabelTitle] = useState<string | number>();
  const [title, setTitle] = useState<string | number>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { canvasId } = router.query;
  const { area, labels, type } = props

  const togglePopoverLabelMenuOpen = () => {
    setCanvasMenuOpen(!canvasMenuOpen);
  };

  const togglePopoverLabelMenuclose = () => {
    if (!labelMenuOpen) {
      setLabelMenuOpen(!labelMenuOpen);
    }
  };

  const togglePopoverlabelMenuOpen = (item) => {
    setLabelID(item.id)
    setCreatedLabelTitle(item.title)
    setLabelMenuOpen(!labelMenuOpen);
  };

  const stopLabelMenuOpen = (e) => {
    e.stopPropagation()
  }

  const handleInputChange = event => {
    setTitle(event.target.value);
  };

  return (
    <Popover className={classNames(
      type === 'landscape' ? "landscape-flame" : type === 'square' ? "square-flame" : "portrait-flame", "p-2"
    )}
      onClick={togglePopoverLabelMenuclose}
    >
      <div className="flex mb-2">
        <label className="pr-2 pt-1 text-gray-600 font-semibold text-sm">
          {area ? area["area_type_text"] : null}
        </label>
        <AiFillQuestionCircle className="area-icon" />
        <AiFillPlusCircle className="area-icon" aria-hidden="true" onClick={togglePopoverLabelMenuOpen}/>
      </div>
      {!canvasMenuOpen && labels && !labels.length && (
        <p className="text-gray-400 font-semibold text-xs">
          {area ? area["description"] : null}
        </p>
      )}
      <div className="flex flex-wrap items-start">
        {labels ? (
          <>
            {labels.map(item => (
              <div className={classNames(
                type === 'landscape' ? "w-1/4" : "w-full", "grid gap-6 bg-white sm:gap-5 sm:p-2 border-l-4 border-customgreen w-1/4 rounded-md text-sm m-1"
              )} key={item.id}
                onClick={stopLabelMenuOpen}>
                {labelID == item.id && !labelMenuOpen ?
                  (
                    <textarea
                      defaultValue={createdLabelTitle}
                      autoFocus={true}
                      onChange={handleInputChange}
                      onKeyPress={e => {
                        if (e.key == "Enter") {
                          e.preventDefault();
                          dispatch(updateLabel(title, area.id, canvasId, item.id, ""))
                          setLabelMenuOpen(!labelMenuOpen)
                        }
                      }}
                      className="border-gray-400 rounded-md w-full text-sm focus:ring-customgreen focus:border-customgreen"
                  />)
                  :(
                    <p className="line-clamp-3" onClick={() => togglePopoverlabelMenuOpen(item)}>
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
            <div className="grid bg-white sm:gap-4 sm:p-2 border-l-4 border-customgreen">
              <textarea
                autoFocus={true}
                onChange={handleInputChange}
                onKeyPress={e => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                    dispatch(newLabel(title, area.id, canvasId))
                    dispatch(fetchCanvas(canvasId));
                    togglePopoverLabelMenuOpen()
                  }
                }}
                className="border-gray-400 rounded-md mr-2 w-full focus:ring-customgreen focus:border-customgreen label-create-from-size text-sm p-1"
              />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
};
