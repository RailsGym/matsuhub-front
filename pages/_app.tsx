import 'tailwindcss/tailwind.css';
import 'styles/components/tables.css';
import 'styles/components/icons.css';
import 'styles/components/areas.css';
import 'styles/components/labels.css';
import Layout from 'layouts/Layout'
import LayoutNotLogin from 'layouts/LayoutNotLogin'
import LayoutNoSidebar from 'layouts/LayoutNoSidebar';

function MyApp({ Component, pageProps }) {
  switch (pageProps.layout) {
    case 'notLogin': {
      return (
        <LayoutNotLogin>
          <Component {...pageProps} />
        </LayoutNotLogin>
      )
    }
    case 'noSidebar': {
      return (
        <LayoutNoSidebar>
          <Component {...pageProps} />
        </LayoutNoSidebar>
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
