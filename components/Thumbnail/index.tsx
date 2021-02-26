import Link from 'next/link';

interface ThumbnailProps {
  caption: string;
  imageUrl: string;
  href?: string;
  small?: boolean;
}

const Thumbnail = ({
  imageUrl, 
  caption, 
  href = '', 
  small = false
}: ThumbnailProps) => {
  return (
    
    <div className="thumbnail">
      {href ? (
        <Link href={href}>
        <a>
          <img src={imageUrl} alt='image' className="thumbnail__image"/>
          <h4 className="thumbnail__caption">{caption}</h4>
        </a>      
      </Link>
      ) : (
        <>
          <img src={imageUrl} alt='image' className="thumbnail__image"/>
          <h4 className="thumbnail__caption">{caption}</h4>
        </>
      )}

      <style jsx>{`
          .thumbnail__image {
            width: ${small ? '100px' : '100%'};
          }
        
          .thumbnail__caption {
            text-align: center;
            padding: 5px;
          }
      `}</style>
    </div>
  )
}

export default Thumbnail;