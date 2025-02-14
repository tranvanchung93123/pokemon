import { endpoints } from "@/constants";
import { Pokemon } from "./getPokemonsByType";

type PokemonTypesResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
        name: string,
        url: string,
    }[]
};

export async function getPokemons({limit, offset}: {limit: number, offset: number}): Promise<Pokemon[]> {
    try {
        const res = await fetch(endpoints.pokeapi.pokemons.list({limit, offset}));
        const data: PokemonTypesResponse = await res.json();
        const pokemons = data?.results || [];

        const formattedPokemons: Pokemon[] = pokemons.map((pokemon) => {
            return {
                name: pokemon.name,
                url: pokemon.url,
                id: Number(pokemon.url.split("/").slice(-2, -1)[0]),
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Number(
                    pokemon.url.split("/").slice(-2, -1)[0]
                )}.gif`,
            };
        });
        return formattedPokemons;
    } catch (error) {
        console.error(error);
        return [];
    }
}