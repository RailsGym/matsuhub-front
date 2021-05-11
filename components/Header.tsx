import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Head from "next/head";
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react'
import { RootState } from 'app/rootReducer'
import { useAppDispatch } from 'app/store'
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { Canvas } from "models/canvases";
import { ChevronDownIcon } from '@heroicons/react/solid'
import { init } from "features/loginUser/LoginUserSlice";

const selectCanvases = (state: RootState) => state.canvases

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ title = "Default title" }) {
  const canvases = useSelector(selectCanvases)
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCanvases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const { loginUser, initialized } = useSelector((state: RootState) => state.loginUser)

  const togglePopoverOpen = () => {
    console.log('togglePopoverOpen')
    setOpen(!open);
  }

  return (
    <div className="font-mono bg-gray-100">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 w-screen flex-col">
        <div className="bg-gray-100">
          <div className="py-3 px-3">
            <div className="flex justify-between flex-wrap">
              <div
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-indigo-50">
                <Popover className="relative">
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                  >
                    新しいキャンバスを作る
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                      onClick={togglePopoverOpen}
                    />
                  </Popover.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      static
                      className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {canvases ? (
                            <>
                              {canvases.map((item) => (
                                <Link href={`canvases/${item.id}`}>
                                  <a
                                    key={item.id}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                  >
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">{item.title}</p>
                                    </div>
                                  </a>
                                </Link>
                              ))}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
              <div className="">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-indigo-50"
                >
                  {loginUser ? (
                    <span>{loginUser.name}</span>
                  ) : null}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
