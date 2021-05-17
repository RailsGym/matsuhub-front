import 'tailwindcss/tailwind.css';
import Layout from 'layouts/Layout'
import LayoutNotLogin from 'layouts/LayoutNotLogin'
import LayoutNotSidebar from 'layouts/LayoutNotSideBar';

function MyApp({ Component, pageProps }) {
  switch (pageProps.layout) {
    case 'notLogin': {
      return (
        <LayoutNotLogin>
          <Component {...pageProps} />
        </LayoutNotLogin>
      )
    }
    case 'notSidebar': {
      return (
        <LayoutNotSidebar>
          <Component {...pageProps} />
        </LayoutNotSidebar>
      );
    }
    default: {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )
    }
  }
}

export default MyApp;
