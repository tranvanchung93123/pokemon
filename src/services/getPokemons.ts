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

export async function getPokemons({ limit, offset }: { limit: number; offset: number }): Promise<{ pokemons: Pokemon[]; total: number }> {
    try {
        const res = await fetch(endpoints.pokeapi.pokemons.list({ limit, offset }));
        const data: PokemonTypesResponse = await res.json();
        
        const pokemons = data?.results || [];
        const total = data.count; // Extract the total count

        const formattedPokemons: Pokemon[] = pokemons.map((pokemon) => {
            const id = Number(pokemon.url.split("/").slice(-2, -1)[0]);
            return {
                name: pokemon.name,
                url: pokemon.url,
                id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
            };
        });

        return { pokemons: formattedPokemons, total };
    } catch (error) {
        console.error(error);
        return { pokemons: [], total: 0 };
    }
}
