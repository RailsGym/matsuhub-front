import BacisAuth from 'components/BacisAuth';

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  await BacisAuth(req, res);
  return {
    props: {}
  };
}

export default function CanvasShow() {
  return (
    <div>
    </div>
  )
};
