"use client";

import { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "0.65rem 0.8rem",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.05)",
  color: "#f2ecff",
  fontSize: "0.95rem",
  marginBottom: "1rem",
  boxSizing: "border-box",
};

const labelStyle = { display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" };

export default function AnamneseForm({ servicoId }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    data_nascimento: "",
    hora_nascimento: "",
    local_nascimento: "",
    observacoes: "",
  });
  const [status, setStatus] = useState("idle"); // idle | enviando | ok | erro
  const [pedidoId, setPedidoId] = useState(null);
  const [erroMsg, setErroMsg] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("enviando");
    setErroMsg("");
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicoId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar");
      setPedidoId(data.pedidoId);
      setStatus("ok");
    } catch (err) {
      setErroMsg(err.message);
      setStatus("erro");
    }
  }

  if (status === "ok") {
    return (
      <div
        style={{
          background: "rgba(120,255,170,0.1)",
          border: "1px solid rgba(120,255,170,0.4)",
          borderRadius: "12px",
          padding: "1.5rem",
        }}
      >
        <p style={{ margin: 0 }}>
          ✅ Pedido registrado! Número do pedido:{" "}
          <code>{pedidoId}</code>
        </p>
        <p style={{ opacity: 0.75, fontSize: "0.9rem", marginTop: "0.5rem" }}>
          A próxima etapa (tela de pagamento com PIX) ainda está sendo
          construída — por enquanto este é só o teste do formulário e do
          registro no banco.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle}>Nome completo</label>
      <input style={inputStyle} required value={form.nome} onChange={update("nome")} />

      <label style={labelStyle}>Email</label>
      <input type="email" style={inputStyle} required value={form.email} onChange={update("email")} />

      <label style={labelStyle}>WhatsApp</label>
      <input style={inputStyle} required placeholder="(11) 91234-5678" value={form.whatsapp} onChange={update("whatsapp")} />

      <label style={labelStyle}>Data de nascimento</label>
      <input type="date" style={inputStyle} required value={form.data_nascimento} onChange={update("data_nascimento")} />

      <label style={labelStyle}>Hora de nascimento (se souber)</label>
      <input type="time" style={inputStyle} value={form.hora_nascimento} onChange={update("hora_nascimento")} />

      <label style={labelStyle}>Local de nascimento (cidade/estado/país)</label>
      <input style={inputStyle} required value={form.local_nascimento} onChange={update("local_nascimento")} />

      <label style={labelStyle}>Observações (opcional)</label>
      <textarea style={{ ...inputStyle, minHeight: "80px" }} value={form.observacoes} onChange={update("observacoes")} />

      {status === "erro" && (
        <p style={{ color: "#ff9d9d" }}>Erro: {erroMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "enviando"}
        style={{
          width: "100%",
          padding: "0.85rem",
          borderRadius: "8px",
          border: "none",
          background: "#8a5cf6",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
          opacity: status === "enviando" ? 0.6 : 1,
        }}
      >
        {status === "enviando" ? "Enviando..." : "Continuar"}
      </button>
    </form>
  );
}
