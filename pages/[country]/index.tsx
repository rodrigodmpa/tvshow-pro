import {useEffect} from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Thumbnail from '../../components/Thumbnail';
// import cookies from 'nookies';

interface Show {
  id: number;
  name: string;
  image: string;
  country: string;
}


interface HomeProps {
  shows: Show[];
  country: string;
}


function Home({shows, country}: HomeProps) {
  const renderShows = () => {
    return shows?.map((show, index) => {
      return (
        <li key={index}>
          <Thumbnail 
            imageUrl={show.image} 
            caption={show.name}
            href={`/${encodeURIComponent(country)}/${encodeURIComponent(show.id)}`}
          />
        </li>
      )
    })
  }
  return (
    <ul className="tvshows">
      
      {renderShows()}

      <style jsx>{`
        margin: 10px;
        .tvshows {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }
      `}</style>
    </ul>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const country = params.country;
  try {
    const response: AxiosResponse<any> = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
    );
    const shows: Show[] = response.data.map((show) => ({
      id: show.show.id,
      name: show.show.name,
      image: show.show?.image?.medium || 'https://via.placeholder.com/210x295?text=?'
    }));
    // console.log(shows)
    console.log(shows)

    return {
      props : {
        shows,
        country
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
      { params: { country: 'us' } },
      { params: { country: 'br' } }
    ],
    fallback: true 
  };
}



export default Home;