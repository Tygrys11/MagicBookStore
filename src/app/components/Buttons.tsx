/************************************************
klasa: Buttons
opis: Komponent przycisku, który renderuje element `<button>` z przekazanym tekstem lub innym elementem jako zawartość. Pozwala na dostosowanie klasy CSS.
pola:
  children - zawartość przycisku (domyślnie pusty ciąg tekstowy)
  className - klasy CSS stosowane do przycisku (domyślnie pusty ciąg tekstowy)
autor: <numer zdającego>
************************************************/

export function Buttons({ children="", className = "" }) {
    return <button className={className}>{children}</button>;
  }
  