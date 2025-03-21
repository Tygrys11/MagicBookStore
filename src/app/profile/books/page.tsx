import BooksListComponent from "@/app/components/BooksList/BooksListComponent";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function Books() {
  return (
    <>
      <Navbar />
      <BooksListComponent />
      <Footer />
    </>
  );
}
