import React from "react";

/************************************************
klasa: Modal
opis: Komponent modalny, który wyświetla okno dialogowe z tytułem, treścią i przyciskiem do zamknięcia. Modal jest animowany i wyświetla się na tle o półprzezroczystym.
pola:
  isOpen - boolean wskazujący, czy modal jest otwarty
  onClose - funkcja wywoływana w celu zamknięcia modalu
  title - tytuł modalu
  content - treść modalu
autor: <numer zdającego>
************************************************/
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  dangerouslySetInnerHTML?: { __html: string }; // to allow HTML injection safely
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  dangerouslySetInnerHTML
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div
          className="modal-body"
          dangerouslySetInnerHTML={dangerouslySetInnerHTML || { __html: content }}
        />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
