import React, { Component } from "react";

function Pokemon(props) {
  return (
    <figure>
      <img src={props.avatar} alt={props.name} />
      <figcaption>{props.name}</figcaption>
    </figure>
  );
}

export default class Pokemons extends Component {
  state = {
    pokemons: [],
  };

  async componentDidMount() {
    let url = "https://pokeapi.co/api/v2/pokemon/";
    const data = await fetch(url);
    const json = await data.json();
    let pokemons = [];

    await Promise.all(
      json.results.map(async (e) => {
        const data = await fetch(e.url);
        const json = await data.json();
        pokemons.push({
          id: json.id,
          name: json.name,
          avatar: json.sprites.front_default,
        });
      })
    );

    this.setState({ pokemons });

    //the for loop has better sorting behavior
    // for await (const data of await json.results.map(
    //   async (e) => await fetch(e.url)
    // )) {
    //   const json = await data.json();
    //   pokemons.push({
    //     id: json.id,
    //     name: json.name,
    //     avatar: json.sprites.front_default,
    //   });
    // }
  }

  render() {
    return (
      <>
        <h1>Pokemons</h1>
        {this.state.pokemons.map((e) => (
          <Pokemon key={e.id} name={e.name} avatar={e.avatar} />
        ))}
      </>
    );
  }
}
