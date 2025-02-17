# Pokémon SSR Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) to explore Pokémon data with Server-Side Rendering (SSR). The app fetches Pokémon details from the **PokeAPI** and displays them, including their images, types, and allows pagination.

## Features

Server-Side Rendering (SSR) for optimal performance and SEO.
Type Filtering: Filter Pokémon by multiple types (e.g., Normal, Fighting).
Pagination: Navigate through Pokémon results with pagination.
Pokémon Data fetched dynamically from the PokeAPI.

## Technologies Used

- **Next.js**: Frontend framework for server-side rendering (SSR).
- **React**: JavaScript library for building the user interface.
- **TypeScript**: Static type checking for safer and more maintainable code.
- **PokeAPI**: Public API to fetch Pokémon data.

## Directory Structure

/src
  ├── /app
  │     └── pokemon-ssr
  │           ├── components
  │           │     └── PokemonSSR.tsx  # Main page component.
  │           └── page.tsx             # Main page component with SSR logic.
  ├── /services
  │     ├── getPokemons.ts         # Service to fetch all Pokémon data.
  │     ├── getPokemonsByType.ts   # Service to fetch Pokémon data by type.
  │     └── getPokemonTypes.ts     # Service to fetch Pokémon types.
  └── /constants
        └── endpoints.ts           # Stores API endpoints.


## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/Chung-Lee/Pokemon-SSR-App.git
```

2. Install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open http://localhost:3000/pokemon-ssr in your browser to see the app.

## API Endpoints

The app uses the following API endpoints:

- PokeAPI: https://pokeapi.co/docs/v2.html
