import { AboutUsComponent } from "../components/AboutUs/AboutUsComponent";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

/************************************************
klasa: AboutUs
opis: Komponent renderujący stronę "O nas", zawierającą pasek nawigacyjny, sekcję "AboutUsComponent" z informacjami o firmie, oraz stopkę.
pola: 
  Brak pól w tym komponencie.
autor: <numer zdającego>
************************************************/

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <AboutUsComponent />
      <Footer />
    </>
  );
}
