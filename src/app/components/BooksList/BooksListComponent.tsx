"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useClerk } from "@clerk/clerk-react";
import styles from "../../../app/styles/OtherPagesStyles/booksList.module.css";
import { ImagesComponent } from "../ImageComponent";
import { db } from "../../../firebase";
import {
  collection,
  query,
  getDocs,
  serverTimestamp,
  addDoc,
  where,
} from "firebase/firestore";

interface Book {
  title: string;
  author: string;
  cover: string;
  id: string;
  description?: string;
  price: number;
}

/************************************************
Funkcja: truncateText
Opis: Funkcja, która skraca tekst do określonej długości i dodaje "..." jeśli tekst jest zbyt długi.
Argumenty:
  text - tekst do skrócenia
  maxLength - maksymalna długość tekstu
Zwraca: skrócony tekst
Autor: <numer zdającego>
************************************************/
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

/************************************************
klasa: BooksListComponent
opis: Komponent, który wyświetla listę książek. Umożliwia dodanie książek do koszyka lub ulubionych oraz wyświetlanie modali informujących o stanie akcji.
pola:
  books - tablica książek do wyświetlenia
  modalMessage - wiadomość, która będzie wyświetlana w modalu
  showLoginModal - stan wskazujący, czy modal logowania jest widoczny
  showAddedModal - stan wskazujący, czy modal dodania książki do koszyka lub ulubionych jest widoczny
  user - obiekt użytkownika z Clerk
autor: <numer zdającego>
************************************************/
export default function BooksListComponent() {
  const { user } = useClerk();
  const [books, setBooks] = useState<Book[]>([]);
  const [, setIsLoggedIn] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showAddedModal, setShowAddedModal] = useState<boolean>(false);
  const router = useRouter();

  /************************************************
  Funkcja: useEffect (stan logowania użytkownika)
  Opis: Sprawdza, czy użytkownik jest zalogowany i ustawia stan logowania.
  Argumenty: Brak
  Zwraca: Brak
  Autor: <numer zdającego>
  ************************************************/
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  /************************************************
  Funkcja: fetchBooks
  Opis: Funkcja asynchroniczna, która pobiera książki z kolekcji Firestore i aktualizuje stan `books`.
  Argumenty: Brak
  Zwraca: Brak
  Autor: <numer zdającego>
  ************************************************/
  const fetchBooks = useCallback(async () => {
    try {
      const booksRef = collection(db, "books");
      const q = query(booksRef);
      const querySnapshot = await getDocs(q);

      const booksList: Book[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "Brak tytułu",
          author: data.author || "Nieznany autor",
          cover: data.cover || "Brak okładki",
          description: data.description || "Brak opisu",
          price: data.price || 0,
        };
      });

      setBooks(booksList);
    } catch (error) {
      console.error("Error fetching books from Firestore:", error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  /************************************************
  Funkcja: addToCart
  Opis: Funkcja asynchroniczna, która dodaje książkę do koszyka użytkownika w Firestore.
  Argumenty:
    book - obiekt książki, który ma zostać dodany do koszyka
  Zwraca: Brak
  Autor: <numer zdającego>
  ************************************************/
  const addToCart = async (book: Book) => {
    console.log("User:", user);

    if (!user) {
      setModalMessage("To add books to your cart, please log in!");
      setShowLoginModal(true);
      return;
    }

    try {
      const cartRef = collection(db, "cart", user.id, "items");
      const q = query(cartRef, where("book_abc", "==", book.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(cartRef, {
          bookId: book.id,
          title: book.title,
          author: book.author,
          cover: book.cover,
          price: book.price,
          addedAt: serverTimestamp(),
        });

        setModalMessage(`Book "${book.title}" has been added to your cart!`);
        setShowAddedModal(true);
      } else {
        alert(`The book "${book.title}" is already in your cart.`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  /************************************************
  Funkcja: addToFavourites
  Opis: Funkcja asynchroniczna, która dodaje książkę do ulubionych użytkownika w Firestore.
  Argumenty:
    book - obiekt książki, który ma zostać dodany do ulubionych
  Zwraca: Brak
  Autor: <numer zdającego>
  ************************************************/
  const addToFavourites = async (book: Book) => {
    if (!user) {
      setModalMessage("To add books to your favourites, please log in!");
      setShowLoginModal(true);
      return;
    }

    try {
      const favouritesRef = collection(db, "favourites", user.id, "items");
      const q = query(favouritesRef, where("book_abc", "==", book.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(favouritesRef, {
          bookId: book.id,
          title: book.title,
          author: book.author,
          cover: book.cover,
          price: book.price,
          addedAt: serverTimestamp(),
        });

        setModalMessage(
          `Book "${book.title}" has been added to your favourites!`
        );
        setShowAddedModal(true);
      } else {
        alert(`The book "${book.title}" is already in your favourites.`);
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📖 Magic Book List</h1>

      {showLoginModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <ImagesComponent
              src="/assets/wizard.png"
              alt="wizard"
              className={styles.wizardImg}
            />
            <p>{modalMessage}</p>
            <div className={styles.modalButtons}>
              <button
                onClick={() => router.push("/LogIn")}
                className={styles.modalButton}
              >
                Log In
              </button>
              <button
                onClick={() => router.push("/SignUp")}
                className={styles.modalButton}
              >
                Sign Up
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className={styles.modalButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddedModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <ImagesComponent
              src="/assets/wizard.png"
              alt="wizard"
              className={styles.wizardImg}
            />
            <p>{modalMessage}</p>
            <div className={styles.modalButtons}>
              <button
                onClick={() => setShowAddedModal(false)}
                className={styles.modalButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.booksGrid}>
        {books.map((book) => (
          <div
            key={book.id}
            className={styles.bookCard}
            onClick={() => router.push(`/books/book/${book.id}`)}
          >
            <br />
            <Image
              src={book.cover || "/assets/default-cover.jpg"}
              alt={book.title}
              width={128}
              height={192}
              className={styles.bookImage}
            />
            <div className={styles.bookInfo}>
              <h2 className={styles.bookTitle}>
                {truncateText(book.title, 40)}
              </h2>
              <p className={styles.bookAuthor}>
                {truncateText(book.author, 30)}
              </p>

              <p className={styles.bookPrice}>${book.price.toFixed(2)}</p>

              <div className={styles.buttonRow}>
                <button
                  className={`${styles.iconButton} ${styles.likeButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToFavourites(book); // Dodaj książkę do ulubionych
                  }}
                >
                  <FaHeart />
                </button>

                <button
                  className={`${styles.iconButton} ${styles.cartButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(book);
                  }}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
