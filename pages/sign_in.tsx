import Auth from 'components/Auth';
import BacisAuth from 'components/BacisAuth';

  export async function getServerSideProps(ctx) {
    const { req, res } = ctx;
    if (process.env.NODE_ENV === 'production') {
      await BacisAuth(req, res);
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
