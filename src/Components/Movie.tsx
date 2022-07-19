import React, { useEffect, useState } from "react";
import { Data, Film } from "../api";
import  MovieList  from "./MovieList"


type Props = {
  filmovi: Film[];
  dodaj: (film: Film) => void;
  dugmePoruka: (film: Film) => string;
};

export const MovieComponent = ({ filmovi, dodaj, dugmePoruka }: Props) => {

  return (
    <div className="movielist">
      {filmovi.map((x,i)=>{
        return <MovieList key={i} film={x} dodaj={dodaj} dugmePoruka={dugmePoruka}/>
      })}
    </div>
  );
};
