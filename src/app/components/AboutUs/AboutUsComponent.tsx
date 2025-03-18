"use client";
import styles from "../../styles/OtherPagesStyles/aboutUs.module.css";
import styles2 from "../../styles/newsletter.module.css";
import {
  BookOpen,
  Tag,
  UserCheck,
  Truck,
  Percent,
  ShieldCheck,
} from "lucide-react";
import { ImagesComponent } from "../ImageComponent";
import { useState } from "react";

/************************************************
klasa: AboutUsComponent
opis: Komponent wyświetlający informacje o sklepie Magic Bookstore, jego misji, historii, lokalizacji oraz powodach, dla których warto wybrać naszą księgarnię. Zawiera także formularz zapisu do newslettera.
pola:
- features - tablica zawierająca cechy sklepu, takie jak szeroki wybór książek, atrakcyjne ceny, profesjonalna obsługa, szybka dostawa, promocje, oraz bezpieczne płatności.
- email - stan przechowujący wartość wprowadzonego przez użytkownika adresu e-mail w formularzu zapisu do newslettera.
- status - stan przechowujący status zapisu do newslettera (loading, subscribed).
metody:
- handleSubscribe - funkcja obsługująca zapisywanie użytkownika do newslettera, zmieniająca status zapisu na "loading" i potem na "subscribed".
autor: <numer zdającego>
************************************************/

export function AboutUsComponent() {
  const features = [
    { icon: <BookOpen size={40} />, title: "Wide selection of books" },
    { icon: <Tag size={40} />, title: "Attractive prices" },
    { icon: <UserCheck size={40} />, title: "Professional customer service" },
    { icon: <Truck size={40} />, title: "Fast delivery" },
    { icon: <Percent size={40} />, title: "Regular promotions and discounts" },
    { icon: <ShieldCheck size={40} />, title: "Secure payment" },
  ];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("subscribed");
    }, 1000);
  };
  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.title}>About Us</h4>
        <div className={styles.contents}>
          <div className={styles.TwoContents}>
            <div className={styles.Info}>
              <h3 className={styles.TitleInfo}>MISSION</h3>
              <p>
                Our mission is to spread the love of literary magic and books
                among all age groups. We believe that books possess a magical
                power to shape minds, ignite imagination, and broaden horizons.
                We support the magic of education by providing educational
                materials, academic literature, and learning resources that help
                students in their studies.
              </p>
            </div>
            <br />
            <div className={styles.Info}>
              <h3 className={styles.TitleInfo}>ABOUT THE COMPANY</h3>
              <p>
                Magic Bookstore is an enchanting bookstore where you’ll find a
                rich selection of books on both magical themes and more
                down-to-earth topics. Whether you're searching for spells and
                legends or classic stories, every book here holds a touch of
                magic. Our bookstore is open in every universe across the
                cosmos. ✨📖
              </p>
            </div>
          </div>

          <div className={styles.Info}>
            <h3 className={styles.TitleInfo}>LOCATION</h3>
            <p>
              Our magical bookstore is now located at 24 Magiczna Street in the
              Enchanted Forest, hidden along an ancient path where stories
              whisper through the air. Once, we resided in the enchanted halls
              of the "Wizards’ Gallery" at 5 Czarodziejska Street, but books
              have a way of leading us to new realms.
              <br />
              <br />
              You may also find traces of our bookstore in Diagon Alley, tucked
              between the shadowed alleys of the Golden Hollow, or at the very
              edge of the Dreaming Woods—if you know where to look. Wherever
              magic thrives, so too does our bookstore, always ready to welcome
              wanderers in search of their next great adventure. ✨📖
            </p>
          </div>
        </div>
      </div>

      <div className={styles.container2}>
        <div className={styles.text}>
          <h1>Feel free to take advantage of our offer!</h1>
          <p>
            We also offer online orders with in-store pickup at our magical
            bookstore.
          </p>
          <br />
          <p>
            We warmly invite you to our store on Magic Street in the Enchanted
            Forest.
          </p>
          <br />
          <p className={styles.text2}>Magic Bookstore:</p> Magic Street 24,
          Enchanted Forest <br />
          <br />
          <p className={styles.text2}>Opening hours:</p> Mon – Sun 11:00 AM – 7:00 PM
          <br />
          <br />
          <p>
            Choose your favorite book and immerse yourself in literary magic at
            its finest!
          </p>
        </div>
        <div className={styles.image}>
          <ImagesComponent src="/assets/magicalLibrary2.jpg" alt="Bookstore" />
        </div>
      </div>

      <hr className={styles.hr} />

      <h4 className={styles.title}>Why Choose Us?</h4>
      <div className={styles.whyWeContainer}>
        {features.map((feature, index) => (
          <div key={index} className={styles.icones}>
            <div className={styles.icon}>{feature.icon}</div>
            <p className={styles.titleIcon}>{feature.title}</p>
          </div>
        ))}
      </div>

      <hr className={styles.hr} />

      <section className={styles2.newsletter}>
        <div className={styles2.container}>
          <div className={styles2.card}>
            <div className={styles2.cardContent}>
              <h2 className={styles2.title}>
                ✨ Join our magical newsletter! ✨
              </h2>
              <p>
                Stay up to date with new books, promotions, and magical events.
              </p>
              <form onSubmit={handleSubscribe} className={styles2.form}>
                <div className={styles2.inputContainer}>
                  <input
                    type="email"
                    placeholder="Your magic email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles2.inputField}
                    required
                  />
                </div>
                <button type="submit" className={styles2.button}>
                  {status === "loading" ? "Subscribed..." : "Sign Up"}
                </button>
              </form>
              {status === "subscribed" && (
                <p className={styles2.successMessage}>
                  Thanks for signing up! 🎩✨
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
