import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PokemonType, Pokemon } from "@/services";

interface PokemonSSRProps {
    types: PokemonType[],
    pokemons: Pokemon[],
    page: number,
    selectedType: string[], // Now an array
    total: number,
}

export const PokemonSSR: React.FC<PokemonSSRProps> = ({ types, pokemons, page, selectedType, total }) => {
    const totalPages = Math.ceil(total / 20);

    // Function to toggle type selection
    const generateTypeUrl = (type: string) => {
        const newSelectedTypes = selectedType.includes(type)
            ? selectedType.filter((t) => t !== type) // Remove if already selected
            : [...selectedType, type]; // Add if not selected

        const newSelectedTypesParam = newSelectedTypes.join(",");
        
        return `/pokemon-ssr?${newSelectedTypesParam ? `type=${newSelectedTypesParam}&` : ""}page=${page}`;
    };
    if(selectedType.length > 0) 
    {
        selectedType = selectedType[0].split(","); // Convert 'normal,fighting' -> ['normal', 'fighting'] 
    }
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Welcome to Pokémon World</h1>

            {/* Type Filters */}
            <div style={{ marginBottom: "20px" }}>
                <span>Types: </span>
                {types.map((type) => (
                    <Link key={type.name} href={generateTypeUrl(type.name)}>
                        <button 
                            style={{ 
                                margin: "5px", 
                                padding: "5px 10px", 
                                background: selectedType.includes(type.name) ? "blue" : "white", 
                                color: selectedType.includes(type.name) ? "white" : "black", 
                                borderRadius: "5px" 
                            }}
                        >
                            {type.name}
                        </button>
                    </Link>
                ))}
            </div>

            {/* Pokémon Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center" }}>
                {pokemons.map((pokemon) => (
                    <div key={pokemon.id} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center", borderRadius: "10px" }}>
                        <Image src={pokemon.image} alt={pokemon.name} width={80} height={80} />
                        <h3>{pokemon.name}</h3>
                        <p>Number: {pokemon.id}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={{ marginTop: "20px" }}>
                {page > 1 && (
                    <Link href={`/pokemon-ssr?page=${page - 1}${selectedType.length ? `&type=${selectedType.join(",")}` : ""}`}>
                        <button style={{ marginRight: "10px" }}>Previous</button>
                    </Link>
                )}
                {page < totalPages && (
                    <Link href={`/pokemon-ssr?page=${page + 1}${selectedType.length ? `&type=${selectedType.join(",")}` : ""}`}>
                        <button>Next</button>
                    </Link>
                )}
            </div>
        </div>
    );
};
