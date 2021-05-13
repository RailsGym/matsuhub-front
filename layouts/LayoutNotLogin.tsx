import Head from 'next/head';
import ToastMessageContainer from 'features/toastMessage/ToastMessageContainer';

export default function LayoutNotLogin({ children, title = 'Default title' }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-100">
      <ToastMessageContainer />
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>
    </div>
  );
}
