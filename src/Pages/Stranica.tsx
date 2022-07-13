import React, {ChangeEvent, useState} from 'react'; 
import MovieList from '../Components/MovieList';
import {Api, Film} from '../Interfaces';

interface Props1{
  filmovi: Film[]
}


const Stranica = ({filmovi}: Props1) => {
  const [omiljeni, setOmiljeni] = useState<Film[]>([]);
  
  const dodaj = (filmZaDodati: Film):void => {
    omiljeni.some(x=>x===filmZaDodati) ? setOmiljeni(omiljeni.filter(x=>x!==filmZaDodati)) : setOmiljeni([...omiljeni, filmZaDodati]);
  }

  const dugmePoruka = (film: Film): string => {
    return (omiljeni.some(x=>x===film) ? "Ukloni sa liste želja" : "Dodaj na listu želja");
  }

  return (
    <div className="movielist">
      {filmovi.map(x=>{
        return <MovieList film={x} dodaj={dodaj} dugmePoruka={dugmePoruka}/>
      })}
    </div>  
  );
}

export default Stranica;