import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PokemonType, Pokemon } from "@/services";


interface PokemonSSRProps {
    types: PokemonType[],
    // total: number,
    pokemons: Pokemon[],
    page: number,
    selectedType: string,
}

export const PokemonSSR: React.FC<PokemonSSRProps> = ({types, pokemons, page, selectedType}) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Welcome to Pokémon World</h1>
        {/* <p>Total: {total}</p> */}

        {/* Type Filters */}
        <div style={{ marginBottom: "20px" }}>
        <span>Types: </span>
        {types.map((type) => (
            <Link key={type.name} href={`/?type=${type.name}`}>
            <button style={{ margin: "5px", padding: "5px 10px", background: selectedType === type.name ? "blue" : "white", color: selectedType === type.name ? "white" : "black", borderRadius: "5px" }}>
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
            <Link href={`/?page=${page - 1}${selectedType ? `&type=${selectedType}` : ""}`}>
            <button style={{ marginRight: "10px" }}>Previous</button>
            </Link>
        )}
        <Link href={`/?page=${page + 1}${selectedType ? `&type=${selectedType}` : ""}`}>
            <button>Next</button>
        </Link>
        </div>
    </div>
  )
}