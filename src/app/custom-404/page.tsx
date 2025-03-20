import Custom404 from "../components/Custom404"; // Ścieżka do komponentu

/************************************************
komponent: Page
opis: Komponent reprezentujący stronę błędu 404. Renderuje komponent Custom404.
pola:
  Custom404 - komponent odpowiedzialny za wyświetlenie komunikatu błędu i przekierowanie użytkownika
autor: <numer zdającego>
************************************************/

export default function Page() {
  return <Custom404 />;
}