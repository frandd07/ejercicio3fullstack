"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListLibros() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  async function fetchLibros() {
    const response = await fetch(`/api/libro?filtro=${filtro}`);
    const body = await response.json();
    setLibros(body);
  }

  useEffect(() => {
    fetchLibros();
  }, [filtro]);

  async function actualizarLeido(id, leido) {
    const response = await fetch("/api/libro", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        update: {
          leido,
        },
      }),
    });

    fetchLibros();
  }

  async function deleteLibro(deleteID) {
    if (window.confirm("¿Seguro que quieres eliminarlo permanentemente?")) {
      const response = await fetch("/api/libro", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteID }),
      });

      fetchLibros();
    }
  }

  return (
    <div>
      <h1>Lista de lectura</h1>
      <label htmlFor="filtro">Filtrar por estado:</label>
      <select
        id="filtro"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="leido">Leídos</option>
        <option value="noLeido">No Leídos</option>
      </select>

      {libros.map((libro) => (
        <p key={libro.id}>
          Título: {libro.titulo} || Autor: {libro.autor}
          <label>
            <input
              type="checkbox"
              checked={libro.leido}
              onChange={(e) => actualizarLeido(libro.id, e.target.checked)}
            />
          </label>
          <button onClick={() => deleteLibro(libro.id)}>Eliminar</button>
        </p>
      ))}

      <br />
      <Link href={"/libro/create"}>Agregar libro a la lista</Link>
    </div>
  );
}
