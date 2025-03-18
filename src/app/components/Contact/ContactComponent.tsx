import styles from "../../styles/OtherPagesStyles/contact.module.css";
import { Buttons } from "../Buttons";
import { ImagesComponent } from "../ImageComponent";
import { FaFacebook, FaInstagram } from "react-icons/fa";

/************************************************
klasa: ContactComponent
opis: Komponent wyświetlający formularz kontaktowy, informacje o sklepie Magic Bookstore oraz dane kontaktowe, takie jak adres, godziny otwarcia, numer telefonu, e-mail i media społecznościowe.
komponenty:
- Buttons - komponent reprezentujący przycisk.
- ImagesComponent - komponent wyświetlający obrazy.
autor: <numer zdającego>
************************************************/

export function ContactComponent() {
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
          <form className={styles.formContainer}>
            <h4 className={styles.formTitle}>Please Contact Us</h4>
            <p>
              To reach us directly through our enchanted portal, simply fill out
              the contact form below. Our magical team will respond to your
              message as swiftly as a spell cast under a full moon, bringing
              answers and assistance to your every query.
            </p>
            <label>Name & Last Name</label>
            <input type="text" name="namelastname" />
            <br />
            <label>E-mail Address</label>
            <input type="email" name="email" />
            <br />
            <label>Message</label>
            <input type="text" name="message" />

            <div className={styles.buttonSend}>
              <Buttons className={styles.send}>Send</Buttons>
            </div>
            <br />
          </form>
        </div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.locationContainer}>
        <h2 className={styles.locationTitle}>Our Stationary Magical Store</h2>

        {/* 📷 Baner */}
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
