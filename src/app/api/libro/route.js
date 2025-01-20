import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eyaraedkwjgspknimmfb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){
    const {data: libros, error} = await supabase
    .from('libro')
    .select('id,titulo,autor,leido')

    return new Response(JSON.stringify(libros), {status:200})
}

export async function PUT(request){
    const body = await request.json()
    const id = body.id
    const{data: updateData, error} = await supabase
    .from("libro")
    .update(body.update)
    .eq("id",id)

    return new Response(JSON.stringify({success: "Actualizado"}, {status:200}))
}

export async function DELETE(request){
    const body = await request.json()
    const id = body.id

    const {data: deleteData, error} = await supabase
    .from("libro")
    .delete()
    .eq("id", id)
    
    return new Response(JSON.stringify({success: "Eliminado correctamente"}), {status:200})
}

export async function POST(request){
    const body = await request.json()
    const libro = body.libro
    const {data: postData, error} = await supabase
    .from("libro")
    .insert(libro)

    return new Response(JSON.stringify({success: "Creado correctamente"}), {status:200})
}