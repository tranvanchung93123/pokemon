import { endpoints } from "@/constants";

export type Pokemon = {
    name: string,
    url: string,
    id: number,
    image: string,
}

type PokemonTypesResponse = {
    pokemon: {
        name: string,
        url: string,
    }[]
};

export async function getPokemonsByType(type: string): Promise<Pokemon[]> {
    try {
        const res = await fetch(endpoints.pokeapi.pokemons.byType({type}));
        const data: PokemonTypesResponse = await res.json();
        const pokemons = data?.pokemon || [];
        const formattedPokemons: Pokemon[] = pokemons.map((pokemon) => {
            return {
                name: pokemon.name,
                url: pokemon.url,
                id: Number(pokemon.url.split("/").slice(-2, -1)[0]),
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Number(
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