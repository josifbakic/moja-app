import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Film } from "../api";

type Props = {
  searchCriteria: string;
  onChangeCriteria: (value: string) => void;
  search: () => void;
  updateFavorites : () => void;
};

export const SearchbarComponent = ({
  searchCriteria,
  onChangeCriteria,
  search,
  updateFavorites
}: Props) => {
  const navigate = useNavigate();
  useEffect(()=>{search(); updateFavorites()},[])
  return (
    <div className="Searchbar">
      <input
        type="text"
        placeholder="Ukucajte ime željenog filma ovde..."
        value={searchCriteria}
        onChange={(e) => onChangeCriteria(e.target.value)} //value => setSearchCriteria(value)
      ></input>
      <button
        className="trazi"
        onClick={() => {
          if (searchCriteria.length != 0){
            search();
            navigate({ pathname: '/pretraga', search: `?q=${searchCriteria}` })
          }
        }}
      >
        Traži
      </button>
      <button className="listazelja" onClick={() =>{
        updateFavorites();
        navigate({ pathname: '/favorites' })
        }}>
        Lista želja
      </button>
    </div>
  );
};
