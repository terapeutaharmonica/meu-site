import Link from "next/link";
import { supabase } from "../lib/supabase";

export const revalidate = 0;

const ICONS = {
  "mapa-natal": "☉",
  "revolucao-solar": "☀",
  "revolucao-lunar": "☾",
};

export default async function Home() {
  const { data: servicos, error } = await supabase
    .from("servicos")
    .select("*")
    .eq("ativo", true)
    .order("ordem");

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✦ ⋆ ☾ ⋆ ✦</div>
        <h1 style={{ fontSize: "2.2rem", margin: 0, letterSpacing: "0.02em" }}>
          Mapas Astrológicos Personalizados
        </h1>
        <p style={{ opacity: 0.75, marginTop: "0.75rem" }}>
          Autoconhecimento através dos astros — leituras feitas sob medida
          para o seu momento de vida.
        </p>
      </header>

      {error && (
        <p style={{ color: "#ff9d9d" }}>
          Erro ao carregar serviços: {error.message}
        </p>
      )}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {servicos?.map((s) => (
          <Link
            key={s.id}
            href={`/servicos/${s.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              transition: "border-color 0.2s",
            }}
          >
            <span style={{ fontSize: "2rem" }}>{ICONS[s.slug] ?? "✦"}</span>
            <h2 style={{ fontSize: "1.2rem", margin: 0 }}>{s.nome}</h2>
            <p style={{ opacity: 0.75, fontSize: "0.95rem", flexGrow: 1 }}>
              {s.descricao}
            </p>
            <strong style={{ fontSize: "1.1rem" }}>
              R$ {Number(s.preco).toFixed(2).replace(".", ",")}
            </strong>
          </Link>
        ))}
      </section>

      {!error && (!servicos || servicos.length === 0) && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>
          Nenhum serviço ativo no momento.
        </p>
      )}
    </main>
  );
}
