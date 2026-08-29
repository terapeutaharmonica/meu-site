import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import AnamneseForm from "./AnamneseForm";

export const revalidate = 0;

export default async function ServicoDetalhe({ params }) {
  const { slug } = await params;

  const { data: servico } = await supabase
    .from("servicos")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();

  if (!servico) notFound();

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <a href="/" style={{ color: "#c9b8ff", textDecoration: "none" }}>
        ← voltar ao catálogo
      </a>

      <h1 style={{ marginTop: "1.5rem" }}>{servico.nome}</h1>
      <p style={{ opacity: 0.8, lineHeight: 1.6 }}>{servico.descricao}</p>
      <p style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
        R$ {Number(servico.preco).toFixed(2).replace(".", ",")}
      </p>

      <hr style={{ borderColor: "rgba(255,255,255,0.15)", margin: "2rem 0" }} />

      <h2 style={{ fontSize: "1.1rem" }}>Dados para o seu mapa</h2>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
        Precisamos desses dados para calcular seu mapa com precisão.
      </p>

      <AnamneseForm servicoId={servico.id} servicoSlug={servico.slug} />
    </main>
  );
}
