import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  const body = await request.json();
  const {
    servicoId,
    nome,
    email,
    whatsapp,
    data_nascimento,
    hora_nascimento,
    local_nascimento,
    observacoes,
  } = body;

  if (!servicoId || !nome || !email || !whatsapp || !data_nascimento || !local_nascimento) {
    return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
  }

  const { data: pedido, error: erroPedido } = await supabase
    .from("pedidos")
    .insert({
      servico_id: servicoId,
      nome_cliente: nome,
      email,
      whatsapp,
      status: "aguardando_pagamento",
    })
    .select()
    .single();

  if (erroPedido) {
    return NextResponse.json({ error: erroPedido.message }, { status: 500 });
  }

  const { error: erroAnamnese } = await supabase.from("anamnese_astrologica").insert({
    pedido_id: pedido.id,
    data_nascimento,
    hora_nascimento: hora_nascimento || null,
    local_nascimento,
    observacoes: observacoes || null,
  });

  if (erroAnamnese) {
    return NextResponse.json({ error: erroAnamnese.message }, { status: 500 });
  }

  return NextResponse.json({ pedidoId: pedido.id });
}
