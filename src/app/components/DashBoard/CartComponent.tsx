"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import styles from "../../../app/styles/OtherPagesStyles/cartComponent.module.css";

interface CartItem {
  id: string;
  bookId: string;
}

interface BookDetails {
  title: string;
  author: string;
  cover: string;
  addedAt: Date;
  price: number;
}

const CONCURRENT_REQUEST_LIMIT = 5;

/************************************************
funkcja: CartComponent
opis: Komponent odpowiedzialny za wyświetlenie koszyka użytkownika. Pobiera pozycje z koszyka i szczegóły książek.
pola:
  items - lista pozycji w koszyku
  bookDetails - lista szczegółów książek w koszyku
  loading - stan ładowania danych
autor: <numer zdającego>
************************************************/
export default function CartComponent() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [items, setItems] = useState<CartItem[]>([]);
  const [bookDetails, setBookDetails] = useState<BookDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /************************************************
  funkcja: useEffect
  opis: Hook odpowiedzialny za pobranie danych koszyka oraz szczegółów książek, jeżeli użytkownik jest zalogowany i dane są załadowane.
  pola:
    brak
  autor: <numer zdającego>
  ************************************************/
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(false);
      return;
    }

    /************************************************
  funkcja: fetchBookDetails
  opis: Funkcja asynchroniczna pobierająca szczegóły książki z bazy na podstawie ID książki.
  pola:
    bookId - ID książki, której szczegóły mają zostać pobrane
  autor: <numer zdającego>
  ************************************************/

    const fetchBookDetails = async (bookId: string) => {
      try {
        const bookRef = collection(db, "books");
        const snapshot = await getDocs(bookRef);
        return snapshot.docs.find((doc) => doc.id === bookId)?.data();
      } catch (error) {
        console.error(`Error fetching book details for ${bookId}:`, error);
        return null;
      }
    };

    /************************************************
    funkcja: fetchCart
    opis: Funkcja asynchroniczna pobierająca pozycje w koszyku z bazy danych i szczegóły książek.
    pola:
      brak
    autor: <numer zdającego>
    ************************************************/
    const fetchCart = async () => {
      try {
        if (!user) {
          console.log("Użytkownik niezalogowany");
          return;
        }

        const cartRef = collection(db, "cart", user.id, "items");
        const snapshot = await getDocs(cartRef);

        if (snapshot.empty) {
          console.log("Koszyk jest pusty");
        }

        const cartItems: CartItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          bookId: doc.data().bookId,
        }));

        console.log("Pobrane książki z koszyka:", cartItems);
        setItems(cartItems);

        /************************************************
        funkcja: fetchBooksWithThrottle
        opis: Funkcja odpowiedzialna za pobieranie szczegółów książek z throttlowaniem zapytań (ograniczenie liczby równoczesnych zapytań).
        pola:
          cartItems - lista pozycji w koszyku, dla których mają zostać pobrane szczegóły książek
        autor: <numer zdającego>
        ************************************************/
        const fetchBooksWithThrottle = async (cartItems: CartItem[]) => {
          const result: BookDetails[] = [];
          for (let i = 0; i < cartItems.length; i += CONCURRENT_REQUEST_LIMIT) {
            const batch = cartItems.slice(i, i + CONCURRENT_REQUEST_LIMIT);
            const batchRequests = batch.map((item) =>
              fetchBookDetails(item.bookId)
            );
            const books = await Promise.all(batchRequests);
            result.push(
              ...(books.filter((book) => book !== null) as BookDetails[])
            );
          }
          return result;
        };

        const books = await fetchBooksWithThrottle(cartItems);

        console.log("Szczegóły książek:", books);
        setBookDetails(books);
      } catch (error) {
        console.error("Błąd pobierania koszyka:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isSignedIn, isLoaded, user]);

  if (!isLoaded) {
    return <p>Ładowanie stanu użytkownika...</p>;
  }

  if (!isSignedIn) {
    return <p>Proszę zalogować się, aby zobaczyć koszyk.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🪄 Twój Magiczny Koszyk ✨</h1>

      {loading ? (
        <p className={styles.loadingMessage}>Ładowanie koszyka...</p>
      ) : items.length === 0 ? (
        <p className={styles.emptyCartMessage}>Twój koszyk jest pusty.</p>
      ) : (
        <div className={styles.grid}>
          {bookDetails.length === 0 ? (
            <p className={styles.emptyCartMessage}>Brak książek w koszyku.</p>
          ) : (
            bookDetails.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={styles.bookCard}
              >
                <div className={styles.bookCardContent}>
                  <div className={styles.leftSide}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className={styles.bookImage}
                    />
                  </div>

                  <div>
                    <h2 className={styles.bookTitle}>{item.title}</h2>
                    <p className={styles.bookAuthor}>Author: {item.author}</p>

                    <p className={styles.bookDate}>
                      {item.addedAt
                        ? item.addedAt instanceof Timestamp
                          ? "Data dodania: " +
                            item.addedAt.toDate().toLocaleDateString()
                          : new Date(item.addedAt).toLocaleDateString()
                        : "Data nieznana"}
                    </p>
                  </div>

                  <div className={styles.rightSide}>
                    <p className={styles.price}>${item.price.toFixed(2)}</p>

                    <div className={styles.quantityWrapper}>
                      <label htmlFor="quantity" className="text-yellow-200">
                        Ilość:
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        defaultValue="1"
                        className={styles.quantityInput}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
