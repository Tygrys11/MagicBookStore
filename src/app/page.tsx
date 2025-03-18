import Footer from "./components/Footer/Footer";
import { AboutUs } from "./components/Home/AboutUs";
import MagicBookCategories from "./components/Home/MagicBookCategories";
import MagicalFeatures from "./components/Home/MagicalFeatures";
import Navbar from "./components/Navbar/Navbar";

/************************************************
klasa: Home
opis: Komponent główny strony, który renderuje wszystkie sekcje strony domowej, w tym pasek nawigacji, funkcje magicznych książek, sekcję "O nas", kategorie książek oraz stopkę.
pola: 
  Brak pól w tym komponencie.
autor: <numer zdającego>
************************************************/

export default function Home() {
  return (
    <>
      <Navbar />
      <MagicalFeatures />
      <AboutUs />
      <MagicBookCategories />
      <Footer />
    </>
  );
}
