import BasicAuth from 'components/BasicAuth';

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  if (process.env.NODE_ENV === 'production') {
    await BasicAuth(req, res);
    if (!req.headers.authorization) {
      res.end('<html>Unauthorized</html>');
    }
  }
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
