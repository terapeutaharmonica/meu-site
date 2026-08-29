export const metadata = {
  title: "Gerenciar Projetos",
  description: "Painel de teste de integração Git + Vercel + Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
