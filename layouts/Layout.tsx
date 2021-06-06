import ToastMessageContainer from 'features/toastMessage/ToastMessageContainer';
import {store} from 'app/store';
import Header from 'components/Header';
import {Provider} from 'react-redux';
import Sidebar from 'components/Sidebar';

export default function Layout({ children, title = 'Default title' }) {
  return (
    <Provider store={store}>
      <ToastMessageContainer />
      <Header title="main-page"></Header>
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
    </Provider>
  );
}
