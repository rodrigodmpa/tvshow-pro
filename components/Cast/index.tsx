
import Thumbnail from '../Thumbnail';

interface CastMember {
  id: string;
  name: string;
  image: string;
}

interface CastProps {
  cast: CastMember[]
}

const Cast = ({cast}:CastProps) => {
  function renderCast() {
    return cast.map((castMember, index) => {
      return(
        <li key={index}>
          <Thumbnail 
            small 
            imageUrl={castMember.image} 
            caption={castMember.name} 
          />
        </li>
      )
    }); 
  }

  return <div className="cast">
    <h3>Cast</h3>
    <ul className="cast__list">
      {renderCast()}
    </ul>

    <style jsx>{`
      .cast__list {
        display: flex;
        overflow-x: scroll;
      }

      .cast__list > :global(li) {
        margin-right: 10px;
      }
    `}</style>
  </div>;
}

export default Cast;