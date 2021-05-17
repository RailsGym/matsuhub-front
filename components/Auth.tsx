import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from 'features/loginUser/LoginUserSlice';
import { RootState } from 'app/rootReducer';
import Cookie from 'universal-cookie';

const cookie = new Cookie();
const selectSignedUpUser = (state: RootState) => state.signedUpUser

export default function Auth() {
  const router = useRouter();
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const { loginUser } = useSelector((state: RootState) => state.loginUser)
  const { signedUpUser } = useSelector(selectSignedUpUser)

  const dispatch = useDispatch();
  const signInUser = async () => {
    dispatch(login(email, password));
  };

  const signUpUser = async () => {
    dispatch(signUp(email, username, password));
  };

  useEffect(() => {
    if (loginUser) {
      router.push("/");
    }
  }, [loginUser]);

  useEffect(() => {
    if (signedUpUser) {
      dispatch(login(email, password));
    }
  }, [dispatch, signedUpUser]);

  const authUser = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await signInUser();
    } else {
      try {
        await signUpUser();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-12">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="guildhub_logo.png"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-xl font-extrabold text-black">
          {isLogin ? 'ログイン' : 'ユーザー作成'}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" value="true" />
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
        {isLogin ? (
          ''
        ) : (
          <>
            <div className="text-black">名前</div>
            <div>
              <input
                name="username"
                type="username"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </>
        )}
        <div className="rounded-md -space-y-px">
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer font-medium text-indigo-500"
              >
                change mode ?
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'ログイン' : '新規ユーザー作成'}
          </button>
        </div>
      </form>
    </div>
  );
}
