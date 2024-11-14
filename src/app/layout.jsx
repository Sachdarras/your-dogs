import Nav from "./component/Nav";
import "./style/global.scss"; // Assure-toi que le chemin vers ton fichier global.scss est correct

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
