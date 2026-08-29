import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const STATUS_LABEL = {
  planejado: { label: "Planejado", color: "#999" },
  em_desenvolvimento: { label: "Em desenvolvimento", color: "#facc15" },
  deployado: { label: "No ar", color: "#4ade80" },
  pausado: { label: "Pausado", color: "#f87171" },
};

async function getProjetos() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("projetos_hub")
    .select("*")
    .order("criado_em");

  if (error) {
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

export default async function Home() {
  const { data, error } = await getProjetos();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f5f5f5",
        padding: "3rem 1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>
          Hub de Projetos
        </h1>
        <p style={{ color: "#999", marginBottom: "2.5rem" }}>
          Acesso central a todos os projetos gerenciados
        </p>

        {error && (
          <p style={{ color: "#ff6b6b" }}>Erro ao conectar: {error}</p>
        )}

        {!error && data && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {data.map((projeto) => {
              const statusInfo =
                STATUS_LABEL[projeto.status] || STATUS_LABEL.planejado;
              const Wrapper = projeto.url ? "a" : "div";
              return (
                <Wrapper
                  key={projeto.id}
                  href={projeto.url || undefined}
                  target={projeto.url ? "_blank" : undefined}
                  rel={projeto.url ? "noopener noreferrer" : undefined}
                  style={{
                    display: "block",
                    background: "#151515",
                    border: "1px solid #2a2a2a",
                    borderRadius: "12px",
                    padding: "1.25rem 1.5rem",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 0.15s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong style={{ fontSize: "1.05rem" }}>
                      {projeto.nome}
                    </strong>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: statusInfo.color,
                        border: `1px solid ${statusInfo.color}`,
                        borderRadius: "999px",
                        padding: "0.15rem 0.6rem",
                      }}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                  {projeto.descricao && (
                    <p
                      style={{
                        color: "#999",
                        margin: "0.4rem 0 0",
                        fontSize: "0.9rem",
                      }}
                    >
                      {projeto.descricao}
                    </p>
                  )}
                </Wrapper>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
