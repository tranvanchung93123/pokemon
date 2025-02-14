import { endpoints } from "@/constants";

export type PokemonType = {
    name: string,
    url: string,
}

type PokemonTypesResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokemonType[],
};

export async function getPokemonTypes(): Promise<PokemonType[]> {
    try {
        const res = await fetch(endpoints.pokeapi.types);
        const data:PokemonTypesResponse = await res.json();
        return data?.results || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}