import React from 'react';
import Rating from '@mui/material/Rating';

interface MovieCardProps {
  image: string;
  title: string;
  rating: number;
  popularity: number;
  releasedDate: string;
  language: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, rating, popularity, releasedDate, language }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[340px]">
      <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} loading='lazy' className="w-full h-auto object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className='flex justify-between items-center my-3'>
        <Rating name="half-rating-read" sx={{color: '#26a69a'}} defaultValue={Number(rating.toFixed(1))/2} precision={0.25} readOnly size="small"/>
        <p className="text-sm text-gray-500">Popularity: {Math.round(popularity)}</p>
        </div>
        <div className='flex justify-between items-center'>
        <p className="text-sm text-gray-500">Date: {releasedDate}</p>
        <p className="text-sm text-gray-500">Language: {language}</p>
        </div>
       
      </div>
    </div>
  );
};

export default MovieCard;
