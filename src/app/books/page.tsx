import BooksListComponent from "../components/BooksList/BooksListComponent";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

/************************************************
klasa: Books
opis: Komponent renderujący stronę książek, zawierającą pasek nawigacyjny oraz stopkę. Aktualnie nie zawiera dodatkowych treści związanych z książkami.
pola: 
  Brak pól w tym komponencie.
autor: <numer zdającego>
************************************************/

export default function Books() {
  return (
    <>
      <Navbar />
      <BooksListComponent />
      <Footer />
    </>
  );
}
