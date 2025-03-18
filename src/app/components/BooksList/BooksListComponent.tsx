"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import styles from "../../../app/styles/OtherPagesStyles/booksList.module.css";
import { ImagesComponent } from "../ImageComponent";

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
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cart, setCart] = useState<Book[]>([]);
  const [likedBooks, setLikedBooks] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  // Nowy stan dla zalogowanego użytkownika
  const [showModal, setShowModal] = useState(false);  // Stan do pokazania modalu
  const booksPerPage = 50;
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=book&limit=${booksPerPage}&page=${currentPage}`
      );
      const data = await response.json();

      const filteredBooks: Book[] = data.docs
        .filter((book: { cover_i?: number }) => book.cover_i)
        .map((book: { description: string; title?: string; author_name?: string[]; cover_i?: number; key: string }) => ({
          title: book.title || "Brak tytułu",
          author: book.author_name ? book.author_name.join(", ") : "Nieznany autor",
          cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
          id: book.key,
          description: book.description || "No description available",
        }));

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Błąd pobierania książek:", error);
    }
  };

  const addToCart = (book: Book) => {
    if (!isLoggedIn) {
      setShowModal(true);  // Jeśli użytkownik nie jest zalogowany, pokazujemy modal
    } else {
      setCart((prevCart) => [...prevCart, book]);
      alert(`Dodano do koszyka: ${book.title}`);
    }
  };

  const likeBook = (id: string) => {
    if (!isLoggedIn) {
      setShowModal(true);  // Jeśli użytkownik nie jest zalogowany, pokazujemy modal
    } else {
      setLikedBooks((prevLikes) => {
        if (prevLikes.includes(id)) {
          return prevLikes.filter((likedId) => likedId !== id);
        } else {
          return [...prevLikes, id];
        }
      });
    }
  };

  const viewDetails = (bookId: string) => {
    if (isClient) {
      router.push(`/books/book/${bookId}`);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCurrentPage(value);
    }
  };    

  const closeModal = () => {
    setShowModal(false); 
  };

  const goToLogin = () => {
    router.push('/LogIn'); 
  };

  const goToSignup = () => {
    router.push('/SignUp'); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📖 Magic Book List</h1>

      {showModal && (
        <div className={styles.modal}>
            
          <div className={styles.modalContent}>
            <ImagesComponent
            src="/assets/wizard.png"
            alt="wizard"
            className={styles.wizardImg}
          />
            <p>To add books to your favorites or cart, you must log in!</p>
            <div className={styles.modalButtons}>
              <button onClick={goToLogin} className={styles.modalButton}>Log In</button>
              <button onClick={goToSignup} className={styles.modalButton}>Sign Up</button>
              <button onClick={closeModal} className={styles.modalButton}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.booksGrid}>
        {books.map((book, index) => (
          <div
            key={index}
            className={styles.bookCard}
            onClick={() => viewDetails(book.id)}
          >
            <br />
            <img
              src={book.cover}
              alt={book.title}
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
                    likeBook(book.id);
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
          onChange={handlePageChange}
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
