export const metadata = {
  title: "Astrologia — Mapas Personalizados",
  description: "Mapa natal, revolução solar e revolução lunar personalizados.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily: "Georgia, 'Times New Roman', serif",
          background: "#0f0b1e",
          color: "#f2ecff",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
