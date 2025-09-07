"use client";
import { useState } from "react";

export default function Page() {
  const [nombre, setNombre] = useState("");
  const [resultado, setInformacionPokemon] = useState<any>(null);
  const [estado, setEstado] = useState<"idle" | "cargando" | "error" | "ok">("idle");


  const buscarPokemon = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("cargando");
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
      if (!res.ok) {
        throw new Error("Pokémon no encontrado");
      }
      const data = await res.json();
      setInformacionPokemon(data);
      setInformacionPokemon(data);
        setEstado("ok");
      } catch {
        setInformacionPokemon(null);
        setEstado("error");
    }
  };

  let contenido;
  if (estado === "cargando") {
    contenido = <p id="loading">Buscando...</p>;
  } else if (estado === "error") {
    contenido = <p id="error">Pokémon no encontrado</p>;
  } else if (estado === "ok" && resultado) {
    contenido = (
      <div id="pokemon-card">
        <h2 id="pokemon-name">{resultado.name}</h2>
        <img src={resultado.sprites.front_default} alt={resultado.name} />
        <p><strong>ID:</strong> {resultado.id}</p>
        <p><strong>Altura:</strong> {resultado.height}</p>
        <p><strong>Peso:</strong> {resultado.weight}</p>
        <p><strong>Tipo:</strong> {resultado.types.map((t: any) => t.type.name).join(", ")}</p>
      </div>
    );
  }

  return (
    <div>
      <h1><strong>Bienvenidos a la pagina de Pokemones</strong></h1>
      <h2>Busca tu pokemon favorito:</h2>

      <div className="container">
        <form onSubmit={buscarPokemon}>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del Pokémon"
            className="input"
          />
          <button type="submit" disabled={!nombre.trim()} id="button">
            Buscar
          </button>
        </form>
        {contenido}
      </div>
    </div>
  );
}
          
  