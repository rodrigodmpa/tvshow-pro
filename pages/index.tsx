import { GetServerSideProps } from "next"
import cookies from 'nookies';
export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { defaultCountry } = cookies.get(ctx);
  const country = ctx.query.country || defaultCountry || 'us';
  return {
    redirect: {
      destination: `/${country}`,
      permanent: false,
    },
  }
}