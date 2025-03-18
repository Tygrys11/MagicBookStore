import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import {ContactComponent} from "../components/Contact/ContactComponent";

/************************************************
klasa: Contact
opis: Komponent renderujący stronę kontaktową, zawierającą formularz kontaktowy oraz nagłówek i stopkę. Zawiera komponenty `Navbar`, `ContactComponent` i `Footer`.
pola: 
  Brak pól w tym komponencie.
autor: <numer zdającego>
************************************************/

export default function Contact() {
  return (
    <>
      <Navbar />
      <ContactComponent />
      <Footer />
    </>
  );
}
