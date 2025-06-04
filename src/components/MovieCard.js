import Image from 'next/image'
import Link from 'next/link'

const MovieCard = ({id, name, image}) => {
  return (
    
  <Link href={`/movie/${id}`}>
    <div className="MovieCard">
        <Image 
        src={image}
        width={500}
        height={150}
        alt={name} />
    <h3>{name}</h3>
    </div>
    </Link>
  )
}

export default MovieCard