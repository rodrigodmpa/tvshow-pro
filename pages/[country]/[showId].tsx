import axios, { AxiosResponse } from "axios";
import parse from 'html-react-parser';
import { GetServerSideProps } from "next"
import Cast from '../../components/Cast'


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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { showId = '1' } = ctx.query;

  try { 
    const response: AxiosResponse<any>  = await axios.get(
      `https://api.tvmaze.com/shows/${showId}?embed=cast`
    );
    
    const show: Show = { 
      name: response.data?.name,
      image: response.data?.image?.original,
      summary: response.data?.summary,
      cast: response?.data?._embedded?.cast?.map((cast) => ({
        id: cast.person?.id,
        name: cast.person?.name,
        image: cast.person?.image?.medium || 'https://via.placeholder.com/210x295?text=?'
      }))
    }
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