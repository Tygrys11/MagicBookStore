"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useClerk } from "@clerk/clerk-react"; // Import Clerk hook
import styles from "../../../app/styles/OtherPagesStyles/booksList.module.css";
import { ImagesComponent } from "../ImageComponent";
import { db, auth } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

interface Book {
  title: string;
  author: string;
  cover: string;
  id: string;
  description?: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function BooksListComponent() {
  const { user } = useClerk(); // Call useClerk hook inside the component
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>(""); // Message for modal
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false); // Login Modal state
  const [showAddedModal, setShowAddedModal] = useState<boolean>(false); // Added Modal state
  const booksPerPage = 50;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=book&limit=${booksPerPage}&page=${currentPage}`
      );
      const data = await response.json();

      const filteredBooks: Book[] = data.docs
        .filter((book: { cover_i?: number }) => book.cover_i)
        .map(
          (book: {
            description: string;
            title?: string;
            author_name?: string[];
            cover_i?: number;
            key: string;
          }) => ({
            title: book.title || "Brak tytułu",
            author: book.author_name
              ? book.author_name.join(", ")
              : "Nieznany autor",
            cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
            id: book.key,
            description: book.description || "No description available",
          })
        );

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addToCart = async (book: Book) => {
    console.log("User:", user);
    
    if (!user) {
      console.error("Błąd: Użytkownik nie jest zalogowany.");
      setModalMessage("To add books to your cart, please log in!");
      setShowLoginModal(true);
      return;
    }
  
    try {
      const userId = user.id;
      const cartRef = collection(db, "cart", user.id, "items");
      const q = query(cartRef, where("book_abc", "==", book.id));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        await addDoc(cartRef, {
          bookId: book.id,
          title: book.title,
          author: book.author,
          cover: book.cover,
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
              src={book.cover}
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
              <br />
              <div className={styles.buttonRow}>
                <button
                  className={`${styles.iconButton} ${styles.likeButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
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

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`${styles.button} ${styles.buttonPrev}`}
          disabled={currentPage === 1}
        >
          ⬅ Back
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
          className={styles.pageInput}
          min="1"
        />
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`${styles.button} ${styles.buttonNext}`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
