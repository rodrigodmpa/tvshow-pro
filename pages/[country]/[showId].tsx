import axios, { AxiosResponse } from "axios";
import parse from 'html-react-parser';
import { GetServerSideProps, GetStaticPaths, GetStaticPathsContext, GetStaticProps } from "next"
import Cast from '../../components/Cast'
import { useRouter } from 'next/router'


interface Show {
  name: string;
  image: string;
  summary: string;
  cast: Cast[];
}

interface Cast {
  id: string;
  name: string;
  image: string;
}

interface ShowDetailsProps {
  show: Show;
}

export default function ShowDetails({ show }: ShowDetailsProps) {
  const router = useRouter()

  // if (router.isFallback) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="show-details">
      <div 
        className="show-details__poster" 
        style={{backgroundImage: `url(${show.image})`}}
      ></div>
      <h1>{show.name}</h1>
      {parse(show.summary)}
      {show.cast.length > 0 && <Cast cast={show.cast}/>}
      <style jsx>{`
        .show-details__poster {
          height: 200px;
          background-size: cover;
        }
      `}</style>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // const { showId = '5617' } = params;
  try { 
    const response: AxiosResponse<any>  = await axios.get(
      `https://api.tvmaze.com/shows/${params.showId}?embed=cast`
    );
    
    const show: Show = { 
      name: response.data?.name || 'No title',
      image: response.data?.image?.original || 'https://via.placeholder.com/400x200?text=?',
      summary: response.data?.summary || 'No summary',
      cast: response?.data?._embedded?.cast?.map((cast) => ({
        id: cast.person?.id,
        name: cast.person?.name || '',
        image: cast.person?.image?.medium || 'https://via.placeholder.com/210x295?text=?'
      }))
    }
    console.log(show)

    return {
      props: {
        show
      }
    }
  }
  catch (error) {
    return {
      notFound: true,
    }
  }
  
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { country: 'us', showId: '5617' } },
      { params: { country: 'br', showId: '10820' } }
    ],
    fallback: 'blocking'
  };
}
