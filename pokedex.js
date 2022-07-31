let pagina = 0;

const divGaleria$$ = document.createElement("div");
divGaleria$$.classList.add("divGaleria");
const pokemonContainer$$ = document.querySelector(".pokemonContainer");
document.body.appendChild(divGaleria$$);
const input$$ = document.querySelector('[data-fn="buscadorInput"]');
const btnBuscar$$ = document.querySelector('[data-fn="pikaBuscador"]');


function llamarApi() {
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pagina}&limit=20`)
    .then((res) => res.json())
    .then((pokemons) => {
      pintarPokemons(pokemons.results);
    });
}
llamarApi();


const pintarPokemons = (pokemons) => {
  console.log(pokemons);
  for (const pokemon of pokemons) {
    const divPokePaint$$ = document.createElement("div");
    divPokePaint$$.classList.add("divImagenesPokemons");
    divPokePaint$$.innerHTML = `<h2>${pokemon.name}</h2>`;
    
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((pokemon) => {
      pintarUnPokemon(pokemon, divPokePaint$$);
      });
    divGaleria$$.appendChild(divPokePaint$$);

    
  }
  // divGaleria$$.classList.add ("divGaleriaPokemons");

  const btnSigPag$$ = document.querySelector('[data-fn="btnSigPag"]');
  btnSigPag$$.addEventListener("click", siguientePagina);
  
};

const pintarUnPokemon = (pokemon, divPokePaint$$) => {
  // console.log (pokemon.sprites)
  const idPokemon$$ = document.createElement ("h3")
  idPokemon$$.textContent = "#" + pokemon.id;
  divPokePaint$$.appendChild(idPokemon$$);
  const cartaPokemons$$ = document.createElement("img");
  cartaPokemons$$.setAttribute("src", pokemon.sprites.other.home.front_default);
  cartaPokemons$$.classList.add("cartaPokemons");

  divPokePaint$$.appendChild(cartaPokemons$$);
  pokemonContainer$$.appendChild(divGaleria$$);

  
  
};

const siguientePagina = () => {
  pagina += 20;
  llamarApi();
  // console.log(pagina)
};


btnBuscar$$.addEventListener("click", search);

function search () {
  console.log("search")
  
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1154`)
  .then((res) => res.json())
  .then((pokemons) => {
    filtrarPokemons(pokemons);
  });
  const filtrarPokemons = (pokemons) => {
    console.log("lista",pokemons);
    console.log(input$$.value)
    const encontrarPokemons = pokemons.results.filter((pokemon) =>
      pokemon.name.includes(input$$.value.toLowerCase())
    );
    divGaleria$$.innerHTML="";
    pintarPokemons(encontrarPokemons);
  };
  

}
  

{/* <button type="submit" class="box" data-fn="btnItem"><h3 class="lupa">🔎</h3></button> */}



