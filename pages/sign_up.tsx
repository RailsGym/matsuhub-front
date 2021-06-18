import { RootState } from 'app/rootReducer';
import { useEffect, useState } from 'react';
import { login } from 'features/loginUser/LoginUserSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'features/signUpUser/SignUpUserSlice';
import Link from 'next/link';

const selectSignedUpUser = (state: RootState) => state.signedUpUser

export const getServerSideProps = async (context) => ({
  props: {
    layout: 'notLogin'
  }
})

export default function SignUp() {
  const router = useRouter();
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signedUpUser } = useSelector(selectSignedUpUser)

  const dispatch = useDispatch();
  const signUpUser = async () => {
    dispatch(signUp(email, username, password));
  };

  useEffect(() => {
    if (signedUpUser) {
      dispatch(login(email, password));
      router.push('/canvases/new');
    }
  }, [signedUpUser]);


  const authUser = async (e) => {
    e.preventDefault();
    try {
      await signUpUser();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-12">
      <div className="text-center text-6xl">
        <h1 className="text-customgreen text-6xl font-semibold">MatsuHub</h1>
        <h2 className="mt-8 text-center text-xl font-extrabold text-customgreen">
          ユーザー作成
        </h2>
      </div>
      <form className="mt-8" onSubmit={authUser}>
        <input type="hidden" name="remember" value="true" />
        <div className="mt-8">
        <div className="text-black">メールアドレス</div>
          <div>
            <input
              name="email"
              type="text"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-customgreen focus:border-customgreen focus:z-10 sm:text-sm"
              value={email}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-8">
        <div className="text-black">名前</div>
          <div>
            <input
              name="username"
              type="username"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-customgreen focus:border-customgreen focus:z-10 focus:ring-1 sm:text-sm "
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="text-black">パスワード</div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-customgreen focus:border-customgreen focus:z-10 sm:text-sm"
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
            className="bg-customgreen py-2 px-4 border-transparent hover:bg-customhoverbackground hover: outline-none focus:outline-none border rounded text-sm font-medium rounded-md group relative w-full flex justify-center"
          >
            新規ユーザー作成
          </button>
          <div className="text-center mt-6">
            <Link href='/sign_in'>
              <a className="text-center text-customgreen">
                ログインはこちら
              </a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
