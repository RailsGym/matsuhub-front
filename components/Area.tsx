import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import Modal from 'react-modal';
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
  const [editLabelId, setEditLabelId] = useState<number>();
  const [title, setTitle] = useState<string | number>();
  const [description, setDescription] = useState<string>("");
  const [hovered, setHovered] = useState<boolean>(false);
  const [editHovered, setEditHovered] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { canvasId } = router.query;
  const { area, labels, type } = props

  const togglePopoverLabelMenuOpen = () => {
    setCanvasMenuOpen(!canvasMenuOpen);
    labelEditHoverReset()
  };

  const togglePopoverLabelMenuclose = () => {
    if (!labelMenuOpen) {
      setLabelMenuOpen(!labelMenuOpen);
    }
    labelEditHoverReset()
  };

  const togglePopoverlabelMenuOpen = (item) => {
    setLabelID(item.id)
    setLabelMenuOpen(!labelMenuOpen);
  };

  const stopLabelMenuOpen = (e) => {
    e.stopPropagation()
  }

  const handleInputChangeTitle = event => {
    setTitle(event.target.value);
  };

  const handleInputChangeLabel = event => {
    setDescription(event.target.value)
  };

  const onMouseLabel = (item) => {
    setEditLabelId(item.id)
    setHovered(!hovered)
  }

  const onMouseLabelEdit = () => {
    setEditHovered(!editHovered)
  }

  const onClickModal = (item) => {
    setTitle(item.title)
    !item.description ? setDescription("") : setDescription(item.description)
    setModalIsOpen(!modalIsOpen)
    labelEditHoverReset()
  }

  const labelUpdate = (area, item) => {
    dispatch(updateLabel(title, area.id, canvasId, item.id, description))
  }

  const labelEditHoverReset = () => {
    setHovered(false)
    setEditHovered(false)
  }

   // TODO: 最終的にclassでstyleを指定できるように
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      background: "rgba(94,96,98,0.3)"
    },
    content: {
      position: "absolute",
      top: "12rem",
      left: "30rem",
      right: "30rem",
      bottom: "16rem",
      borderRadius: "0.5rem",
      padding: "1.5rem",
    }
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
                      defaultValue={item.title}
                      autoFocus={true}
                      onChange={handleInputChangeTitle}
                      onKeyPress={e => {
                        if (e.key == "Enter") {
                          e.preventDefault();
                          labelUpdate(area, item)
                          togglePopoverLabelMenuclose()
                        }
                      }}
                      className="border-gray-400 rounded-md w-full text-sm focus:ring-customgreen focus:border-customgreen"
                  />)
                  : (
                    <div className="relative" onMouseEnter={() => onMouseLabel(item)} onMouseLeave={() => onMouseLabel(item)}>
                      <p className="line-clamp-3" onClick={() => togglePopoverlabelMenuOpen(item)}>
                        {item.title}
                      </p>
                      {editLabelId == item.id && hovered && (
                        <div onMouseEnter={() => onMouseLabelEdit()} onMouseLeave={() => onMouseLabelEdit()}>
                          <MdModeEdit onClick={() => onClickModal(item)} className={classNames(editHovered && ("bg-gray-100 rounded-sm"), "absolute right-0 bottom-0 text-xl")} />
                        </div>
                      )}
                      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={modalStyle} >
                        <div className="mt-2">
                          <div className="modal-icon">
                            <BsX onClick={() => onClickModal(item)} />
                          </div>
                          <div className="mb-6">
                            <p className="text-gray-600 font-semibold text-sm">タイトル</p>
                            <textarea
                              onChange={handleInputChangeTitle}
                              defaultValue={title}
                              className="h-20 bg-gray-100 border-gray-400 rounded-md w-full text-sm focus:ring-customgreen focus:border-customgreen"
                            />
                          </div>
                          <div>
                            <p className="text-gray-600 font-semibold text-sm">説明</p>
                            <textarea
                              onChange={handleInputChangeLabel}
                              defaultValue={description}
                              className="h-20 bg-gray-100 border-gray-400 rounded-md w-full text-sm focus:ring-customgreen focus:border-customgreen"
                            />
                          </div>
                          <div className="mt-4 text-right">
                            <button
                              onClick={() => labelUpdate(area, labels.find(label => label.id == editLabelId))}
                              className="h-8 w-1/4 rounded-md bg-customgreen text-white text-sm hover:text-customhovercolor hover:bg-customhoverbackground hover: outline-none focus:outline-none"
                            >
                              更新する
                              </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
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
                onChange={handleInputChangeTitle}
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
