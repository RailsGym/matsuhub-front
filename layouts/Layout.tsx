import ToastMessageContainer from 'features/toastMessage/ToastMessageContainer';
import {store} from "app/store";
import Header from "components/Header";
import {Provider} from "react-redux";

export default function Layout({ children, title = "Default title" }) {
  return (
    <Provider store={store}>
      <ToastMessageContainer />
      <Header title="main-page"></Header>
      {children}
    </Provider>
  );
}
