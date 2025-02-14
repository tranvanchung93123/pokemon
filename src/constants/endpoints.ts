export const endpoints = {
    pokeapi: {
        types: "https://pokeapi.co/api/v2/type",
        pokemons: {
            list: ({offset, limit}: { offset: number, limit: number }) => `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
            byType: ({type}: {type: string}) => `https://pokeapi.co/api/v2/type/${type}`,
        }
    },
}