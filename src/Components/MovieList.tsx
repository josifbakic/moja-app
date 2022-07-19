import React from 'react';
import { Film } from '../api';

interface Props{
    film: Film;
    dodaj: (filmZaDodati: Film) => void;
    dugmePoruka: (film: Film) => string;
}

const MovieList = ({film, dodaj, dugmePoruka}: Props) => {
    return (
        <div className="stavka">
            <div className='title'>
                <span>{film.Title+" ("+film.Year+")"}</span>
                <br></br>
                <span>{film.Type}</span>
            </div>
            <img src={film.Poster} alt={film.Title} />
            <div>
                <button onClick={() => dodaj(film)}>{dugmePoruka(film)}</button>
            </div>
            <br></br>
            <br></br>
        </div>
    )
};

export default MovieList;