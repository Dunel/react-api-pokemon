import React, { useEffect, useState } from "react";

function Pokemones() {
  const [Pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon");
        const json = await data.json();
        let pokemon = [];

        await Promise.all(
          json.results.map(async (e) => {
            const data = await fetch(e.url);
            const json = await data.json();
            pokemon.push({
              id: json.id,
              name: json.name,
              avatar: json.sprites.front_default,
            });
          })
        );
        setPokemons(pokemon.map((e) => e));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemon();
  }, []);
  return (
    <>
      <h1>Pokemones</h1>

      {Pokemons.length > 0
        ? Pokemons.map((e) => <Pokemon key={e.id} props={e} />)
        : "No hay Pokemons"}
    </>
  );
}

function Pokemon({ props }) {
  return (
    <figure>
      <img src={props.avatar} alt={props.name} />
      <figcaption>{props.name}</figcaption>
    </figure>
  );
}

export default Pokemones;
