import React, { useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import Head from "next/head";
import { RootState } from '../app/rootReducer'
import { useAppDispatch } from '../app/store'
import { fetchCanvases } from './../features/canvases/canvasesSlice';
import { Canvas } from "../models/canvases";

const selectCanvases = (state: RootState) => state.canvases

export default function Header({ title = "Default title" }) {
  const canvases = useSelector(selectCanvases)
  const [state, setState] = useState<{ canvases: Array<Canvas> }>({ canvases: [] });
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCanvases());
  }, [dispatch]);

  return (
    <div className="font-mono bg-gray-100">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 w-screen flex-col">
        <div className="bg-gray-100">
          <div className="py-3 px-3">
            <div className="flex justify-between flex-wrap">
              <div className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-indigo-50">
                新しいキャンバスを作る
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
                { canvases ? (
                  <ul>
                    {canvases.map((item) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                  </ul>
                ) : null }
              </div>
              <div className="">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-indigo-50"
                >
                  matsumoto
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
