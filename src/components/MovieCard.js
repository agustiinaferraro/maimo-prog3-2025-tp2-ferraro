import Image from 'next/image'
import Link from 'next/link'

const MovieCard = ({id, title, image}) => {
  
  return (
    
  <Link href={`/movie/${id}`}>
    
    <div className="MovieCard">
        <Image 
        src={image}
        width={500}
        height={150}
        alt={title} />
    <h3>{title}</h3>
    </div>
    </Link>
  )
}

export default MovieCard