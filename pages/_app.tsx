import "tailwindcss/tailwind.css";
import Layout from 'layouts/Layout'
import LayoutNotLogin from 'layouts/LayoutNotLogin'

function MyApp({ Component, pageProps }) {
  switch (pageProps.layout) {
    case 'notLogin': {
      return (
        <LayoutNotLogin>
          <Component {...pageProps} />
        </LayoutNotLogin>
      )
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
