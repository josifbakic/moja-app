import React from 'react';
import { Film } from '../Interfaces';

interface Props{
    film: Film;
    dodaj(filmZaDodati: Film): void;
    dugmePoruka(film: Film): string;
}

const MovieList = ({film, dodaj, dugmePoruka}: Props) => {
    return (
        <div className="stavka">
            <div className='title'>
                <span>{film.Title+" ("+film.Year+")"}</span>
            </div>
            <img src={film.Poster} alt={film.Title} />
            <div className="tip">
                <span>
                    {film.Type}
                </span>
                <button onClick={()=>{dodaj(film)}}>{dugmePoruka(film)}</button>
            </div>
            <br></br>
        </div>
    )
};

export default MovieList;