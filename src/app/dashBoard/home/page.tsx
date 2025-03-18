"use client";
import React, { use } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MagicalFeatures from "../../components/Home/MagicalFeatures";
import { AboutUs } from "../../components/Home/AboutUs";
import MagicBookCategories from "../../components/Home/MagicBookCategories";
import Footer from "../../components/Footer/Footer";

/************************************************
klasa: dashBoard
opis: Komponent reprezentujący główną stronę dashboardu, która renderuje kilka sekcji aplikacji, takich jak nagłówek, sekcje z funkcjami, kategoriami książek i stopką.
pola: 
- <brak pól w tej klasie, ponieważ jest to komponent funkcjonalny, a nie klasa z polami w tradycyjnym sensie>
autor: <numer zdającego>
************************************************/

const dashBoard = () => {
  return (
    <>
        <Navbar />
        <MagicalFeatures />
        <AboutUs />
        <MagicBookCategories />
        <Footer />
    </>
  );
};

export default dashBoard;
