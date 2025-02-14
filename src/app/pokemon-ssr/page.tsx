import { getPokemonTypes, getPokemonsByType, getPokemons } from "@/services";
import { PokemonSSR } from "./components";

export default async function PokemonSSRPage(props: {
  searchParams?: Promise<{
    type?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const type = searchParams?.type || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  const pokemonTypes = await getPokemonTypes();
  
  const pokemons = await getPokemons({limit: 20, offset: (currentPage - 1) * 20});

  // 
  return (
    <PokemonSSR types={pokemonTypes} pokemons={pokemons} page={currentPage} selectedType={type} />
  );
}

