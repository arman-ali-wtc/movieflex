import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetailsAndVideos } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Skeleton } from '@mui/material';

export const MovieDetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    const { selectedMovie, selectedVideo, status, error } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieDetailsAndVideos({ id: Number(id) }));
        }
    }, [id, dispatch]);

    if (status === 'loading') {
        return (
            <div className='flex flex-wrap gap-6 justify-center'>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </div>
        );
    }

    if (status === 'failed') return <div>Error: {error}</div>;

    if (!selectedMovie) return <div>No movie details available.</div>;

    return (
        <div className='w-full relative'>
            <img src={`https://image.tmdb.org/t/p/w1280/${selectedMovie.backdrop_path}`} alt={selectedMovie.title} loading='lazy' className="w-full h-auto object-cover" />
            <div className='flex flex-col bg-black bg-opacity-50 lg:backdrop-blur-md lg:absolute shadow-2xl shadow-gray-900 top-0 left-0 p-4 w-full lg:w-1/4 rounded-br-3xl'>
                <h1 className='text-3xl font-bold mb-2 drop-shadow-lg'>{selectedMovie.original_title}</h1>
                <p className='text-lg drop-shadow-md hidden md:block'>{selectedMovie.overview}</p>
            </div>
            {selectedVideo && selectedVideo.results.length > 0 && (
                <iframe
                    className="w-full h-[360px] lg:h-[700px] mt-4"
                    src={`https://www.youtube.com/embed/${selectedVideo.results[0].key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
};
