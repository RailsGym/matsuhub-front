import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { useRouter } from 'next/router';
import { login } from 'features/loginUser/LoginUserSlice';
import BasicAuth from 'components/BasicAuth';

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  if (process.env.NODE_ENV === 'production') {
    await BasicAuth(req, res);
    if (!req.headers.authorization) {
      res.end('<html>Unauthorized</html>');
    }
  }
  return {
    props: {
      layout: 'notLogin'
    }
  };
  }

export default function SignIn() {
  const router = useRouter();
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useSelector((state: RootState) => state.loginUser)
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginUser) {
      router.push("/");
    }
  }, [loginUser]);

  const authUser = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-12">
      <div>
        <h1 className="site-title-logo">MatsuHub</h1>
        <h2 className="mt-6 text-center text-xl font-extrabold text-blue">
          ログイン
        </h2>
      </div>
      <form className="mt-8" onSubmit={authUser}>
        <input type="hidden" name="remember" value="true" />
        <div className="mt-10">
          <div className="text-black">メールアドレス</div>
          <div>
            <input
              name="email"
              type="text"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="email address"
              value={email}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-10">
          <div className="text-black">パスワード</div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="btn-blue py-2 px-4 border-transparent"
          >
            ログイン
          </button>
          <div className="text-center mt-6">
            <Link href='/sign_up'>
              <a className='text-center text-blue'>
                アカウント登録はこちら
              </a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
