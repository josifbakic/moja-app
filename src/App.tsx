import React, {ChangeEvent, useState} from 'react';
import './App.css';
import MovieList from './Components/MovieList';
import {Api, Film} from './Interfaces';

function App() {
  const [ime, setIme]=useState<string>("");
  const [filmovi, setFilmovi] = useState<Film[]>([])
  const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
    setIme(event.target.value);
  }
  const trazi = ():void => {
    fetch(`http://www.omdbapi.com/?s=${ime}&apikey=e7ee4081`)
    .then((res)=>res.json())
    .then((res: Api) => setFilmovi(res.Search));
  }
  return (
    <div className="App">
      <div className="Searchbar">
        <input id='srcbar' type='text' placeholder='Ukucajte ime zeljenog filma ovde...' onChange={handleChange}></input>
        <button onClick={trazi}>Trazi</button>
      </div>
    {filmovi.map(x=>{
      return <MovieList Title={x.Title} Year={x.Year} imdbID={x.imdbID} Type={x.Type} Poster={x.Poster}/>
    })}  
    </div>
  );
}

export default App;
