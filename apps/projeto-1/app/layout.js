export const metadata = {
  title: "Projeto 1 (placeholder)",
  description: "Link de teste — nome e conteúdo definitivos ainda por vir",
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
