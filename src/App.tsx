import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SearchbarComponent } from "./Components/Searchbar";
import { useSearchParams } from "react-router-dom";
import { MovieComponent } from "./Components/Movie";
import { Data, Film } from "./api";

const App = () => {
  const [searchParams] = useSearchParams();
  const [searchCriteria, setSearchCriteria] = useState(searchParams.get("q") || "");
  const [filmovi, setFilmovi] = useState<Film[]>([]);
  const [omiljeni, setOmiljeni] = useState<Film[]>([]);

  useEffect(() => {
    setSearchCriteria(searchParams.get("q") || "");
  }, [searchParams]);

  const azurirajOmiljene = () => {
    const data = JSON.parse(localStorage.getItem("omiljeni") || "[]");
    if (data) {
      setOmiljeni(data);
    }
  };

  const trazi = () => {
    fetch(`http://www.omdbapi.com/?s=${searchCriteria}&apikey=e7ee4081`)
      .then((res) => res.json())
      .then((data: Data) =>
        data.Response === "True" ? setFilmovi(data.Search) : setFilmovi([])
      );
  };

  const dodaj = (filmZaDodati: Film) => {
    if (omiljeni.some((x) => x.imdbID === filmZaDodati.imdbID)) {
      const newData = omiljeni.filter((x) => x.imdbID !== filmZaDodati.imdbID);
      setOmiljeni(newData);
      localStorage.setItem("omiljeni", JSON.stringify(newData));
    } else {
      const newData = [...omiljeni, filmZaDodati]
      localStorage.setItem("omiljeni", JSON.stringify(newData));
      setOmiljeni(newData)
    };
  };

  const dugmePoruka = (film: Film) => {
    return (omiljeni.includes(film) ? "Ukloni sa liste želja" : "Dodaj na listu želja")
  }

  return (
    <>
      <SearchbarComponent
        searchCriteria={searchCriteria}
        onChangeCriteria={(value) => setSearchCriteria(value)}
        search={trazi}
        updateFavorites={azurirajOmiljene}
      />
      <Routes>
        <Route path="/" element={<div>Landing page</div>} />
        <Route
          path="/pretraga"
          element={filmovi.length===0 ? <div>Nema rezultata za datu pretragu...</div> : <MovieComponent filmovi={filmovi} dodaj={dodaj} dugmePoruka={dugmePoruka}/>}
        />
        <Route
          path="/favorites"
          element={omiljeni.length===0 ? <div>Trenutno nema filmova na listi želja...</div> : <MovieComponent filmovi={omiljeni} dodaj={dodaj} dugmePoruka={dugmePoruka}/>}
        />
      </Routes>
    </>
  );
};

export default App;

// function Foo() {
//   const [ime, setIme]=useState<string>("");
//   const [filmovi, setFilmovi] = useState<Film[]>([]);
//   const [omiljeni, setOmiljeni] = useState<Film[]>([]);

//   const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
//     setIme(event.target.value);
//   }

//   const trazi = ():void => {
//     fetch(`http://www.omdbapi.com/?s=${ime}&apikey=e7ee4081`)
//     .then((res)=>res.json())
//     .then((res: Api) => setFilmovi(res.Search));
//   }

// const dodaj = (filmZaDodati: Film):void => {
//   if (omiljeni.some(x=>x==filmZaDodati)){
//     setOmiljeni(omiljeni.filter(x=>x!=filmZaDodati));
//   }
//   else setOmiljeni([...omiljeni, filmZaDodati]);
// }

//   const prikaziZelje = ():void =>{
//     setFilmovi(omiljeni);
//   }

//   const dugmePoruka = (film: Film): string => {
//     if (omiljeni.some(x=>x==film)) return "Ukloni sa liste želja"
//     else return "Dodaj na listu želja";
//   }

//   return (
//     <div className="App">
// <div className="Searchbar">
//   <input id='srcbar' type='text' placeholder='Ukucajte ime željenog filma ovde...' onChange={handleChange}></input>
//   <button className="trazi" onClick={trazi}>Traži</button>
//   <button className="listazelja" onClick={prikaziZelje}>Lista želja</button>
// </div>
//       <div className="movielist">
//         {filmovi.map(x=>{
//           return <MovieList film={x} dodaj={dodaj} dugmePoruka={dugmePoruka}/>
//         })}
//       </div>
//     </div>
//   );
// }
