import React, {ChangeEvent, useState} from 'react';
import './App.css';
import MovieList from './Components/MovieList';
import {Api, Film} from './Interfaces';

function App() {
  const [ime, setIme]=useState<string>("");
  const [filmovi, setFilmovi] = useState<Film[]>([]);
  const [omiljeni, setOmiljeni] = useState<Film[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
    setIme(event.target.value);
  }

  const trazi = ():void => {
    fetch(`http://www.omdbapi.com/?s=${ime}&apikey=e7ee4081`)
    .then((res)=>res.json())
    .then((res: Api) => setFilmovi(res.Search));
  }

  const dodaj = (filmZaDodati: Film):void => {
    if (omiljeni.some(x=>x==filmZaDodati)){
      setOmiljeni(omiljeni.filter(x=>x!=filmZaDodati));
    }
    else setOmiljeni([...omiljeni, filmZaDodati]);
  }

  const prikaziZelje = ():void =>{
    setFilmovi(omiljeni);
  }

  const dugmePoruka = (film: Film): string => {
    if (omiljeni.some(x=>x==film)) return "Ukloni sa liste želja"
    else return "Dodaj na listu želja";
  }

  return (
    <div className="App">
      <div className="Searchbar">
        <input id='srcbar' type='text' placeholder='Ukucajte ime željenog filma ovde...' onChange={handleChange}></input>
        <button className="trazi" onClick={trazi}>Traži</button>
        <button className="listazelja" onClick={prikaziZelje}>Lista želja</button>
      </div>
      <div className="movielist">
        {filmovi.map(x=>{
          return <MovieList film={x} dodaj={dodaj} dugmePoruka={dugmePoruka}/>
        })}
      </div>  
    </div>
  );
}

export default App;
