import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import { useAxios } from "./hooks";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, setPokemon] = useState([]);
  const [response, getData, setUrl] = useAxios(null)

  //On DOM load url/response will be null. addPokemon will update the URL state with the Pokemon name we want data for. This triggers the useAxios useEffect to update the response data. 
  const addPokemon = async name => {
    setUrl(`https://pokeapi.co/api/v2/pokemon/${name}`);
  };

  const removePokemon = ()=>{
    setPokemon([]);
  };

  //Once the response state is updated, the Pokedex useEffect function will be called and add the Pokemon data to the state causing a rerender with the new Pokemon. setUrl needs to be set back to null in order for duplicate Pokemon to be added consecutively.
  useEffect(()=>{
    if(response){
    setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
    setUrl(null);
    };
  },[response]);


  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} removePokemon={removePokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.sprites.front_default}
            back={cardData.sprites.back_default}
            name={cardData.name}
            stats={cardData.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
