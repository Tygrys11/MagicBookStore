"use client";
import { useState } from "react";
import { Buttons } from "../Buttons";
import { ImagesComponent } from "../ImageComponent";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { db } from "../../../firebase";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import styles from "../../styles/OtherPagesStyles/contact.module.css";

/************************************************
funkcja: ContactComponent
opis: Komponent odpowiedzialny za wyświetlenie formularza kontaktowego oraz sekcji kontaktowych, umożliwiający użytkownikowi wysłanie wiadomości.
pola:
  formData - dane formularza (imię, email, wiadomość)
  loading - stan ładowania wiadomości
  messageStatus - komunikat dotyczący statusu wiadomości
autor: <numer zdającego>
************************************************/
export function ContactComponent() {
  const { user, isSignedIn } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState<string>("");

  /************************************************
  funkcja: handleChange
  opis: Funkcja obsługująca zmiany wartości w formularzu, aktualizując odpowiednie dane.
  pola:
    e - zdarzenie zmiany wartości w polu formularza
  autor: <numer zdającego>
  ************************************************/
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /************************************************
  funkcja: handleSubmit
  opis: Funkcja obsługująca wysyłanie formularza, zapisująca dane w bazie danych Firebase.
  pola:
    e - zdarzenie wysyłania formularza
  autor: <numer zdającego>
  ************************************************/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.message) {
      setMessageStatus("Proszę wypełnić wszystkie pola formularza.");
      setTimeout(() => setMessageStatus(""), 5000);
      if (!isSignedIn) {
        setMessageStatus("Proszę zalogować się, aby wysłać wiadomość.");
        setTimeout(() => setMessageStatus(""), 5000);
      }
      return;
    }
  
    if (!user || !user.id) {
      setMessageStatus("Nie można znaleźć identyfikatora użytkownika.");
      setTimeout(() => setMessageStatus(""), 5000);
      return;
    }
  
    setLoading(true);
  
    try {
      const contactRef = doc(db, "contactUs", user.id);
      const userDoc = await getDoc(contactRef);
  
      if (!userDoc.exists()) {
        await setDoc(contactRef, {
          userId: user.id,
          createdAt: new Date(),
        });
      }
  
      const messagesRef = collection(contactRef, "messages");
      const currentDate = new Date();
      const messageId = currentDate.toISOString();
  
      await addDoc(messagesRef, {
        messageId: messageId,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: currentDate,
      });
  
      setMessageStatus("Twoja wiadomość została wysłana pomyślnie!");
      setTimeout(() => setMessageStatus(""), 5000);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
      setMessageStatus("Wystąpił błąd podczas wysyłania wiadomości.");
      setTimeout(() => setMessageStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className={styles.admission}>
        <h1 className={styles.title}>Contact Magic BookStore</h1>
        <div className={styles.maindescription}>
          <b>
            <u>Welcome to the Magic Bookstore Contact Section!</u>✨
          </b>
          We’re here to happily dispel all your doubts like a puff of enchanted
          smoke. If you have any questions about orders, our magical books, or
          any other mysterious matter, don’t hesitate – reach out to us! Our
          team, full of magic and enthusiasm, will gladly help you find answers
          to all your questions and make every bookish adventure even more
          magical.
        </div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.container}>
        <div className={styles.image}>
          <ImagesComponent
            src="/assets/contact.jpg"
            alt="ContactImageDecoration"
          />
        </div>
        <div className={styles.text}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h4 className={styles.formTitle}>Please Contact Us</h4>
            <p>
              To reach us directly through our enchanted portal, simply fill out
              the contact form below. Our magical team will respond to your
              message as swiftly as a spell cast under a full moon, bringing
              answers and assistance to your every query.
            </p>
            <label>Name & Last Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isSignedIn}
            />
            <br />
            <label>E-mail Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isSignedIn}
            />
            <br />
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={!isSignedIn}
            />

            <div className={styles.buttonSend}>
              <Buttons className={styles.send}>
                {loading ? "Sending..." : "Send"}
              </Buttons>
            </div>
            <br />

            {messageStatus && (
              <p className={styles.messageStatus}>{messageStatus}</p>
            )}
          </form>
        </div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.locationContainer}>
        <h2 className={styles.locationTitle}>Our Stationary Magical Store</h2>

        <div className={styles.locationBanner}>
          <ImagesComponent
            src="/assets/bannerStationary.jpg"
            alt="Magic Bookstore Interior"
          />
        </div>

        {/* 🏪 Sekcja 4 kolumn */}
        <div className={styles.locationContent}>
          {/* 📍 Lokalizacja */}
          <div className={styles.locationInfo}>
            <h3 className={styles.infoTitle}>🏰 Magic Bookstore</h3>
            <p>Zaklęta Aleja 13</p>
            <p>00-666 Fantasmagoria</p>
          </div>

          {/* ⏳ Godziny Otwarcia */}
          <div className={styles.locationInfo}>
            <h3 className={styles.infoTitle}>🕰️ Opening hours</h3>
            <p>Monday – Saturday: 10:00 - 20:00</p>
            <p>Sunday: 11:00 - 19:00 (Moonlit Night from 10pm)</p>
          </div>

          {/* 📞 Kontakt */}
          <div className={styles.locationInfo}>
            <h3 className={styles.infoTitle}>📞 Contact</h3>
            <p>
              <b>Phone Number:</b> +48 000 000 000
            </p>
            <p>
              <b>Email:</b>
              <a href="mailto:bookstore@magicalBooks.pl">
                bookstore@magicalBooks.pl
              </a>
            </p>
          </div>

          {/* 🌐 Media Społecznościowe */}
          <div className={styles.locationInfo}>
            <h3 className={styles.infoTitle}>🔮 Magic Portals</h3>
            <div className={styles.socialIcons}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
