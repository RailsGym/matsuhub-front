import Auth from 'components/Auth';
import BasicAuth from 'components/BasicAuth';

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  if (process.env.NODE_ENV === 'production') {
    await BasicAuth(req, res);
  }
  return {
    props: {
      layout: 'notLogin'
    }
  };
  }

export default function Home() {
  return (
    <Auth />
  );
}
