import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Head from 'next/head';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react'
import { RootState } from 'app/rootReducer'
import { useAppDispatch } from 'app/store'
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { Canvas } from 'models/canvases';
import { ChevronDownIcon } from '@heroicons/react/solid'
import { init } from 'features/loginUser/LoginUserSlice';
import { useRouter } from 'next/router';

const selectCanvases = (state: RootState) => state.canvases

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ title = 'Default title' }) {
  const canvases = useSelector(selectCanvases)
  const { loginUser, initialized } = useSelector((state: RootState) => state.loginUser);
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    if (loginUser) {
      dispatch(fetchCanvases());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  useEffect(() => {
    if (!loginUser && initialized) {
      router.push('/sign_in');
    }
  }, [initialized]);

  const togglePopoverOpen = () => {
    console.log('togglePopoverOpen')
    setOpen(!open);
  }

  return (
    <div className="bg-gray-100">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 w-screen flex-col">
        <div className="bg-gray-100">
          <div className="py-3 px-3">
            <div className="flex justify-between flex-wrap">
              <div className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium text-gray-700">
                <Popover className="relative" onClick={togglePopoverOpen}>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-1000" : "text-gray-700",
                      "group rounded-md inline-flex items-center text-lg font-semibold hover:text-gray-900 focus-visible:ring-white focus-visible:ring-opacity-75 focus:outline-none"
                    )}
                  >
                    キャンバスをつくる
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-50"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-50"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden w-1/2">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-5 sm:p-2">
                          <Link href="/canvases/new">
                            <a className="text-sm font-medium text-gray-900 border-bottom-solid border-b-2 py-1 px-2">
                              新しいキャンバスを作成する
                            </a>
                          </Link>
                          {canvases ? (
                            <>
                              {canvases.map(item => (
                                <Link href={`/canvases/${item.id}`}>
                                  <a
                                    key={item.id}
                                    className="-m-3 py-2 px-1 flex items-start rounded-lg hover:bg-gray-50"
                                  >
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900">
                                        {item.title}
                                      </p>
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
                  {loginUser ? <span>{loginUser.name}</span> : null}
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
