"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Firebase configuration
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react"; // Importujemy Hook Clerk

// Definicja typu dla przedmiotu w koszyku
interface CartItem {
  id: string;
  bookId: string; // ID książki z kolekcji "book_abc"
}

interface BookDetails {
  title: string;
  author: string;
  cover: string;
  addedAt: { seconds: number }; // timestamp z Firestore
}

const CONCURRENT_REQUEST_LIMIT = 5; // Limit równoczesnych żądań

export default function CartComponent() {
  const { user, isLoaded, isSignedIn } = useUser(); // Hook z Clerk do uzyskania użytkownika
  const [items, setItems] = useState<CartItem[]>([]);
  const [bookDetails, setBookDetails] = useState<BookDetails[]>([]); // Dodanie stanu na szczegóły książek
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(false);
      return;
    }

    // Function to fetch book details from Open Library API
    const fetchBookDetails = async (bookId: string) => {
      try {
        console.log(`Fetching details for bookId: ${bookId}`);
        const response = await fetch(`https://openlibrary.org${bookId}.json`);
        if (!response.ok) {
          console.error(`Failed to fetch details for ${bookId}`);
          return null;
        }
        const bookData = await response.json();
        console.log(`Book data for ${bookId}:`, bookData);

        if (!bookData) {
          return null;
        }

        const coverImageUrl = bookData.cover
          ? `https://covers.openlibrary.org/b/id/${bookData.cover.medium}-M.jpg`
          : "https://via.placeholder.com/150";

        return {
          title: bookData.title || "Brak tytułu",
          author: bookData.authors
            ? bookData.authors[0].name
            : "Nieznany autor",
          cover: coverImageUrl,
          addedAt: new Date(), // Placeholder for added date
        };
      } catch (error) {
        console.error(`Error fetching book details for ${bookId}:`, error);
        return null;
      }
    };

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

        console.log("Pobrane książki z koszyka:", cartItems); // Log the cart items
        setItems(cartItems);

        // Fetch book details with throttling
        const fetchBooksWithThrottle = async (cartItems: CartItem[]) => {
          const result: BookDetails[] = [];
          for (let i = 0; i < cartItems.length; i += CONCURRENT_REQUEST_LIMIT) {
            // Take a batch of items to fetch
            const batch = cartItems.slice(i, i + CONCURRENT_REQUEST_LIMIT);
            const batchRequests = batch.map((item) =>
              fetchBookDetails(item.bookId)
            );
            const books = await Promise.all(batchRequests);
            result.push(
              ...(books.filter(
                (book) => book !== null
              ) as unknown as BookDetails[])
            );
          }
          return result;
        };

        const books = await fetchBooksWithThrottle(cartItems);

        console.log("Szczegóły książek:", books); // Log the fetched book details
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
    <div className="bg-[#1a001a] min-h-screen p-6 flex flex-col items-center text-yellow-400">
      <h1 className="text-3xl text-center font-bold mb-6">
        🪄 Twój Magiczny Koszyk ✨
      </h1>

      {loading ? (
        <p className="text-yellow-300">Ładowanie koszyka...</p>
      ) : items.length === 0 ? (
        <p className="text-yellow-500">Twój koszyk jest pusty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {bookDetails.length === 0 ? (
            <p className="text-yellow-500">Brak książek w koszyku.</p>
          ) : (
            bookDetails.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[#330033] text-yellow-300 shadow-lg rounded-2xl p-4 border border-yellow-500 transition-transform"
              >
                <img
                  src={item.cover || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h2 className="text-xl font-semibold">
                  {item.title || "Brak tytułu"}
                </h2>
                <p className="mt-1 text-yellow-200">
                  Autor: {item.author || "Nieznany"}
                </p>
                <p className="mt-1 text-yellow-500 text-sm">
                  {item.addedAt
                    ? new Date(item.addedAt.seconds * 1000).toLocaleDateString()
                    : "Data nieznana"}
                </p>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
