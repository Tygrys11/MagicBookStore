import {ImagesComponent} from "./ImageComponent"

/************************************************
klasa: Banner
opis: Komponent wyświetlający obrazek na stronie, używający komponentu `ImagesComponent` do renderowania obrazu.
pola:
  src - ścieżka do obrazu, który ma zostać wyświetlony
  className - klasy CSS stosowane do obrazka, takie jak obramowanie, marginesy i inne style
autor: <numer zdającego>
************************************************/

export default function Banner() {
  return (

    <ImagesComponent
    src={"/assets/3.jpg"}
    className="rounded-lg border border-slate-400 mt-8 w-full sm:w-auto opacity-95 mx-auto d-block"
  />
  
  )
}
