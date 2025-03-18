'use client'
import { useUser } from "@clerk/clerk-react"; // Importuj hook do sprawdzenia stanu użytkownika
import styles from "../../styles/aboutus.module.css";
import { ImagesComponent } from "../ImageComponent";

/************************************************
klasa: AboutUs
opis: Komponent wyświetlający wstępny opis Magic Bookstore wraz z zaproszeniem do odkrywania więcej informacji.
pola:
  Brak pól w tej klasie.
autor: <numer zdającego>
************************************************/

export function AboutUs() {
  const { user } = useUser(); 

  const aboutUsLink = user ? "/dashBoard/aboutus" : "/aboutus"; 

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>Welcome to Magic Bookstore</h1>
          <p>
            📚 Step into a world where every book holds a touch of magic. Magic
            Bookstore isn’t just a bookstore – it’s a gateway to adventures,
            mysteries, and unforgettable stories.
          </p>
          <br />
          <p>
            ✨ Immerse yourself in literature that inspires, teaches, and
            captivates. From bestsellers to hidden literary gems, you’ll find
            books that ignite your imagination and transport you to
            extraordinary worlds.
          </p>
          <br />
          <p>
            🔮 Your next great journey starts here!
            <br />
            Whether you love fantasy, classics, non-fiction, or
            self-development, Magic Bookstore has something special just for
            you.
          </p>
          <br />
          <strong>
            👉 Explore our collection and discover your next favorite book
            today!
          </strong>
          <br /><br />
          <a href={aboutUsLink} className={styles.btn}> 
            Discover More About Us ›
          </a>
        </div>
        <div className={styles.image}>
          <ImagesComponent src="/assets/magicalLibrary.jpg" alt="Bookstore" />
        </div>
      </div>
    </>
  );
}
