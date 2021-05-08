import Auth from "components/Auth";

export const getServerSideProps = async (context) => ({
  props: {
    layout: 'notLogin'
  }
})

export default function Home() {
  return (
    <Auth />
  );
}
