import React from 'react';
import { Film } from '../Interfaces';

const MovieList = (film: Film) => {
    return (
        <div className="stavka">
            <div className='title'>
                <span>{film.Title}</span>
                <span>{film.Year}</span>
            </div>
            <img src={film.Poster} alt={film.Title} />
            <div className="tip">
                <span>
                    {film.Type}
                </span>
            </div>
            <br></br>
        </div>
    )
};

export default MovieList;