'use client'

import { use, useState } from "react"

export default function CreateLibro(){
    const[titulo,setTitulo]  = useState("")
    const[autor,setAutor]  = useState("")
    const[leido, setLeido] = useState(false)
    

    

    async function crearLibro(){
        const response = await fetch("/api/libro", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                libro: {
                    titulo: titulo,
                    autor: autor,
                    leido: leido
                }
            })
        })

        if(response.ok){
            alert("Libro creado")
            setTitulo("")
            setAutor("")
            setLeido(false)
        }else{
            alert("Hubo un error al crearlo")
        }
    }

    return(
        <div>
            <h1>Crear nuevo libro</h1>
            <form onSubmit={crearLibro}>
                <label>
                    Título: 
                <input 
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                />
                </label>
                <br/>
                <label>
                    Autor
                <input 
                type="text"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                />
                </label>
                <br/>
                <label>
                    ¿Lo has leido? 
                <input 
                type="checkbox"
                value={leido}
                onChange={(e) => setLeido(e.target.checked)}
                />
                <br/>
                <input type="submit" value="Añadir libro"/>
                </label>
            </form>
        </div>
    )
}