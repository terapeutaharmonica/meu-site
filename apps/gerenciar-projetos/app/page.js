import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

async function getLinhasTeste() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("teste_conexao")
    .select("*")
    .order("id");

  if (error) {
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

export default async function Home() {
  const { data, error } = await getLinhasTeste();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#f5f5f5",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        Sou seu projeto online 🚀
      </h1>
      <p style={{ color: "#999", marginBottom: "2.5rem" }}>
        Teste de integração: GitHub → Vercel → Supabase
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#151515",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "1.5rem",
          textAlign: "left",
        }}
      >
        <h2 style={{ fontSize: "1rem", color: "#999", marginTop: 0 }}>
          Dados lidos da tabela{" "}
          <code style={{ color: "#f5f5f5" }}>teste_conexao</code>
        </h2>

        {error && (
          <p style={{ color: "#ff6b6b" }}>Erro ao conectar: {error}</p>
        )}

        {!error && data && data.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {data.map((linha) => (
              <li
                key={linha.id}
                style={{
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #2a2a2a",
                }}
              >
                <strong style={{ color: "#4ade80" }}>✓ {linha.nome}</strong>
                <div style={{ color: "#ccc" }}>{linha.mensagem}</div>
              </li>
            ))}
          </ul>
        )}

        {!error && data && data.length === 0 && (
          <p style={{ color: "#999" }}>Nenhuma linha encontrada.</p>
        )}
      </div>
    </main>
  );
}
