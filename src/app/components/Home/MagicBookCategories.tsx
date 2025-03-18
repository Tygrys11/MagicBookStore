"use client";
import { ImagesComponent } from "../ImageComponent";
import styles from "../../styles/newsletter.module.css";
import Image from "next/image";
import { useState } from "react";

const categories = [
  {
    title: "Chronicles of Ancient Wisdom",
    image: "/assets/CategoriesIconsBig/scroll.png",
    description: "Timeless masterpieces that have shaped the literary world, from legendary myths to the greatest novels in history.",
  },
  {
    title: "Enchanted Tales",
    image: "/assets/CategoriesIconsBig/wizard.png",
    description: "Step into magical realms, futuristic worlds, and epic adventures filled with wizards, dragons, and interstellar journeys.",
  },
  {
    title: "Legends of Heroes",
    image: "/assets/CategoriesIconsBig/sword.png",
    description: "Brave warriors, daring explorers, and historical figures come to life in these thrilling tales of courage and destiny.",
  },
  {
    title: "Elixirs of Love",
    image: "/assets/CategoriesIconsBig/love-birds.png",
    description: "Heartfelt stories of passion, fate, and timeless love that will enchant your soul and stir your emotions.",
  },
  {
    title: "Secret Scrolls of Detectives",
    image: "/assets/CategoriesIconsBig/private-detective.png",
    description: "Unravel the mysteries, follow the clues, and dive into suspenseful stories where nothing is as it seems.",
  },
  {
    title: "Tomes of Wise Masters",
    image: "/assets/CategoriesIconsBig/magic-book.png",
    description: "Unlock the secrets of the universe, from groundbreaking discoveries to mind-expanding explorations of human knowledge.",
  },
  {
    title: "Scrolls of Modern Alchemists",
    image: "/assets/CategoriesIconsBig/books.png",
    description: "A collection of wisdom from today’s greatest minds—perfect for learning, self-improvement, and mastering new skills.",
  },
  {
    title: "Masquerades of Imagination",
    image: "/assets/CategoriesIconsBig/theater-masks.png",
    description: "Emotionally rich narratives that explore the depth of human experience, artfully crafted by the finest storytellers.",
  },
  {
    title: "Map of Worlds & Afterlife",
    image: "/assets/CategoriesIconsBig/airplane.png",
    description: "Journey through uncharted lands, explore hidden cultures, and uncover the wonders of our world and beyond.",
  },
  {
    title: "Dragon Chefs’ Recipes",
    image: "/assets/CategoriesIconsBig/cooking.png",
    description: "From ancient feasts to modern delights—discover magical recipes that bring flavors to life in your own enchanted kitchen.",
  },
  {
    title: "Secrets of Golden Chambers",
    image: "/assets/CategoriesIconsBig/money-bag.png",
    description: "Unlock the treasures of financial wisdom, career success, and personal growth with these powerful guides.",
  },
  {
    title: "Book of Little Wizards",
    image: "/assets/CategoriesIconsBig/baby-bottle.png",
    description: "A whimsical collection of stories, fables, and adventures to ignite the imagination of young sorcerers and dreamers.",
  },
  {
    title: "Grimoire of Secret Knowledge",
    image: "/assets/CategoriesIconsBig/notebook.png",
    description: "A library of essential learning, filled with spellbooks of knowledge for students, scholars, and curious minds.",
  },
];

/************************************************
klasa: MagicBookCategories
opis: Komponent wyświetlający kategorie książek w sklepie Magic Bookstore oraz formularz subskrypcji newslettera.
pola:
  categories - tablica obiektów zawierająca kategorie książek z tytułem, obrazkiem oraz opisem
  email - wartość przechowująca adres email użytkownika do subskrypcji
  status - status procesu subskrypcji (loading, subscribed)
autor: <numer zdającego>
************************************************/

export default function MagicBookCategories() {
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
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-purple-900 text-center">
            📚 Enchanted Book Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-purple-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    className="rounded-lg object-contain mx-auto"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-800">
                  {category.title}
                </h3>
                <p className="text-gray-600 mt-2">{category.description}</p>
                <button className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition">
                  Discover More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.title}>
                ✨ Join our magical newsletter! ✨
              </h2>
              <p>
                Stay up to date with new books, promotions, and magical events.
              </p>
              <form onSubmit={handleSubscribe} className={styles.form}>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    placeholder="
                    Your magic email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                    required
                  />
                </div>
                <button type="submit" className={styles.button}>
                  {status === "loading" ? "Subscribed..." : "Sign Up"}
                </button>
              </form>
              {status === "subscribed" && (
                <p className={styles.successMessage}>
                  Thanks for signing up! 🎩✨
                </p>
              )}
            </div>
          </div>
          <ImagesComponent
            src="/assets/wizard.png"
            alt="wizard"
            className={styles.wizardImg}
          />
        </div>
      </section>
      <br />
    </>
  );
}
