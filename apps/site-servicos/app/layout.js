export const metadata = {
  title: "Site Serviços & Produtos",
  description: "Catálogo de serviços e produtos digitais",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
