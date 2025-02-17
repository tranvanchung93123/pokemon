import { getPokemonTypes, getPokemonsByType, getPokemons } from "@/services";
import { PokemonSSR } from "./components";

export default async function PokemonSSRPage(props: {
  searchParams?: Promise<{
    type?: string | string[]; // Accept multiple types
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const type = searchParams?.type
    ? Array.isArray(searchParams.type)
      ? searchParams.type
      : [searchParams.type]
    : []; // Ensure it's always an array
  const currentPage = Number(searchParams?.page) || 1;


  const pokemonTypes = await getPokemonTypes();
  let pokemons = [];
  let total = 0;

  if (type.length > 0) {
    // Ensure 'type' is an array of individual types
    const typeArray = type[0].split(","); // Convert 'normal,fighting' -> ['normal', 'fighting']

    // Fetch Pokémon by multiple types (AND filtering)
    const filteredPokemons = await Promise.all(
      typeArray.map((t) => getPokemonsByType(t))
    );

    // Perform "AND" filtering: Get Pokémon that exist in all selected types
    const intersection = filteredPokemons.reduce((acc, list) => {
      return acc.length === 0
        ? list
        : acc.filter((pokemon) => list.some((p) => p.id === pokemon.id));
    }, []);

    total = intersection.length;
    pokemons = intersection.slice((currentPage - 1) * 20, currentPage * 20);
} else {
    // Fetch all Pokémon (default case)
    ({ pokemons, total } = await getPokemons({ limit: 20, offset: (currentPage - 1) * 20 }));
}


  return (
    <PokemonSSR 
      types={pokemonTypes} 
      pokemons={pokemons} 
      page={currentPage} 
      selectedType={type} 
      total={total} 
    />
  );
}
