import React from 'react';

interface MovieCardProps {
  image: string;
  title: string;
  rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">Rating: {rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
