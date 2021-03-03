import { GetServerSideProps } from "next"
export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const country = 'us';
  return {
    redirect: {
      destination: `/${country}`,
      permanent: false,
    },
  }
}