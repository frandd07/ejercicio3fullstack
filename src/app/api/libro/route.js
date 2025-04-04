import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eyaraedkwjgspknimmfb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
  const url = new URL(request.url);
  const filtro = url.searchParams.get("filtro") || "todos";

  let query = supabase.from("libro").select("id,titulo,autor,leido");

  if (filtro === "leido") {
    query = query.eq("leido", true);
  } else if (filtro === "noLeido") {
    query = query.eq("leido", false);
  }

  const { data: libros, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(libros), { status: 200 });
}

export async function PUT(request) {
  const body = await request.json();
  const id = body.id;
  const { data: updateData, error } = await supabase
    .from("libro")
    .update(body.update)
    .eq("id", id);

  return new Response(
    JSON.stringify({ success: "Actualizado" }, { status: 200 })
  );
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;

  const { data: deleteData, error } = await supabase
    .from("libro")
    .delete()
    .eq("id", id);

  return new Response(JSON.stringify({ success: "Eliminado correctamente" }), {
    status: 200,
  });
}

export async function POST(request) {
  const body = await request.json();
  const libro = body.libro;

  if (titulo !== "" && autor !== "") {
    const { data: postData, error } = await supabase
      .from("libro")
      .insert(libro);

    if (!error) {
      return new Response(JSON.stringify({ success: "Creado correctamente" }), {
        status: 200,
      });
    }
  } else {
    return new Response(
      JSON.stringify({ error: "Alguno de los campos esta vacío" }),
      { status: 400 }
    );
  }
}
