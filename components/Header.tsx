import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Head from 'next/head';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react'
import { RootState } from 'app/rootReducer'
import { useAppDispatch } from 'app/store'
import { fetchCanvases } from 'features/canvases/canvasesSlice';
import { ChevronDownIcon } from '@heroicons/react/solid'
import { init } from 'features/loginUser/LoginUserSlice';
import { useRouter } from 'next/router';
import Cookie from 'universal-cookie';

const cookie = new Cookie();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ title = 'Default title' }) {
  const canvases = useSelector((state: RootState) => state.canvases);
  const { canvas } = useSelector((state: RootState) => state.canvas);
  const { loginUser, initialized } = useSelector((state: RootState) => state.loginUser);
  const [canvasMenuOpen, setCanvasMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
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

  const togglePopoverCanvasMenuOpen = () => {
    setCanvasMenuOpen(!canvasMenuOpen);
  };

  const togglePopoverUserMenuOpen = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const logout = () => {
    cookie.remove('access-token', { path: '/' });
    cookie.remove('client', { path: '/' });
    cookie.remove('uid', { path: '/' });
    router.push('/sign_in');
  };
  
  return (
    <div className="bg-gray-100">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 w-screen flex-col">
        <div className="bg-gray-100">
          <div className="py-1">
            <div className="flex justify-between flex-wrap">
              <div className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium text-gray-700">
                <Popover
                  className="relative"
                  onClick={togglePopoverCanvasMenuOpen}
                >
                  <Popover.Button
                    className={classNames(
                      canvasMenuOpen ? "text-gray-1000" : "text-gray-700",
                      "group rounded-md inline-flex items-center text-md font-semibold hover:text-gray-900 focus-visible:ring-white focus-visible:ring-opacity-75 focus:outline-none"
                    )}
                  >
                    {canvas && router.pathname !== '/canvases/new'
                      ? canvas.title
                      : 'キャンバスをつくる'}
                    <ChevronDownIcon
                      className={classNames(
                        canvasMenuOpen ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>
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
                    <Popover.Panel
                      static
                      className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden w-1/2">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-5 sm:p-2">
                          <Link href="/canvases/new">
                            <a
                              className={classNames(
                                canvases && canvases.length
                                  ? "border-bottom-solid border-b-2"
                                  : null,
                                "text-sm font-medium text-gray-900 py-1 px-2"
                              )}
                            >
                              新しいキャンバスを作成する
                            </a>
                          </Link>
                          {canvases ? (
                            <>
                              {canvases.map(item => (
                                <Link href={`/canvases/${item.id}`} key={item.id}>
                                  <a className="-m-3 py-2 px-1 flex items-start rounded-lg hover:bg-gray-50">
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
              <div className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium text-gray-700">
                <Popover
                  className="relative"
                  onClick={togglePopoverUserMenuOpen}
                >
                  <Popover.Button
                    className={classNames(
                      userMenuOpen ? "text-gray-1000" : "text-gray-700",
                      "group rounded-md inline-flex items-center text-md hover:text-gray-900 focus-visible:ring-white focus-visible:ring-opacity-75 focus:outline-none"
                    )}
                  >
                    {loginUser ? <span>{loginUser.name}</span> : null}
                    <ChevronDownIcon
                      className={classNames(
                        userMenuOpen ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    show={userMenuOpen}
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
                      className="absolute right-0 flex justify-end mt-3 px-2 w-screen max-w-sm sm:px-0 lg:ml-0"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden w-1/3">
                        <div className="grid gap-6 bg-white px-5 py-6 sm:gap-5 sm:p-2">
                          <button
                            className="text-sm font-medium text-gray-900 py-1 px-2"
                            onClick={logout}
                          >
                            ログアウト
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
