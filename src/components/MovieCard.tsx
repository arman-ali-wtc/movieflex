import React from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  image: string;
  title: string;
  rating: number;
  popularity: number;
  releasedDate: string;
  language: string;
  movieId: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, rating, popularity, releasedDate, language, movieId }) => {
  return (
    <Link to={`/movie/${movieId}`}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[340px] shadow-md shadow-slate-300/50">
      <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} loading='lazy' className="w-full h-auto object-cover" />
      <div className="p-4 bg-gray-950">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className='flex justify-between items-center my-3'>
        <Rating name="half-rating-read" sx={{color: '#26a69a'}} defaultValue={Number(rating.toFixed(1))/2} precision={0.25} readOnly size="small"/>
        <p className="text-sm text-gray-500">Popularity: <b>{Math.round(popularity)}</b></p>
        </div>
        <div className='flex justify-between items-center'>
        <p className="text-sm text-gray-500">Date: <b>{releasedDate}</b></p>
        <p className="text-sm text-gray-500">Language: <b>{language}</b></p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default MovieCard;
