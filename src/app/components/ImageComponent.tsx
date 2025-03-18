/************************************************
klasa: ImagesComponent
opis: Komponent odpowiedzialny za renderowanie obrazka (`<img>`), który pozwala na dostosowanie źródła obrazu, klasy CSS oraz innych atrybutów jak `alt`, `width`, i `height`.
pola:
  src - źródło obrazu (domyślnie pusty ciąg tekstowy)
  className - klasy CSS stosowane do obrazu (domyślnie pusty ciąg tekstowy)
  alt - tekst alternatywny dla obrazu (domyślnie pusty ciąg tekstowy)
  width - szerokość obrazu (domyślnie pusty ciąg tekstowy)
  height - wysokość obrazu (domyślnie pusty ciąg tekstowy)
autor: <numer zdającego>
************************************************/

export function ImagesComponent({src="",className="",alt="", width="", height=""}) {
    return <img src={src} className={className} alt={alt} width={width} height={height}/>
}