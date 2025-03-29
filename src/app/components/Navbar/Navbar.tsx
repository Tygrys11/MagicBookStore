"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MdDashboard, MdShoppingCart } from "react-icons/md";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Buttons } from "../Buttons";
import styles from "../../styles/navbar.module.css";
import Banner from "../Banner";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "About Us", href: "/aboutus" },
  { name: "Contact", href: "/contact" },
];

const authenticatedNavigation = [
  { name: "Home", href: "/profile/home" },
  { name: "Books", href: "/profile/books" },
  { name: "About Us", href: "/profile/aboutus" },
  { name: "Contact", href: "/profile/contact" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/************************************************
klasa: Navbar
opis: Komponent nawigacji (pasek nawigacyjny) zawierający linki do różnych sekcji strony oraz obsługujący logowanie, rejestrację i wylogowanie użytkowników.
pola:
  navigation - tablica zawierająca linki do sekcji strony dla niezalogowanych użytkowników
  authenticatedNavigation - tablica zawierająca linki do sekcji strony dla zalogowanych użytkowników
  scrolled - stan wskazujący, czy strona została przewinięta
  pathname - ścieżka URL, która jest używana do określenia, która strona jest aktualnie aktywna
  router - obiekt odpowiedzialny za nawigację w Next.js
  user - obiekt zawierający informacje o zalogowanym użytkowniku
  isLoaded - stan wskazujący, czy dane użytkownika zostały załadowane
  signOut - funkcja do wylogowania użytkownika
autor: <numer zdającego>
************************************************/

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      if (pathname === "/" || pathname === "/LogIn" || pathname === "/SignUp") {
        router.push("/profile/home");
      }
    }
  }, [user, isLoaded, pathname, router]);

  useEffect(() => {
    if (isLoaded) {
      setIsAuthenticated(!!user);
  
      if (!user) {
        if (
          pathname?.startsWith("/profile") || 
          pathname === "/profile/cart" || 
          pathname === "/profile/dashboard"
        ) {

          router.replace("/custom-404"); 
        }
      }
  
      if (user && (pathname === "/" || pathname === "/LogIn" || pathname === "/SignUp")) {
        console.log("Przekierowanie do profile/home...");
        router.push("/profile/home");
      }
    }
  }, [user, isLoaded, pathname, router]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Disclosure
        as="nav"
        className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-indigo-950 bg-opacity-90 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center space-x-2 lg:hidden">
              {/* Jeśli użytkownik jest zalogowany, pokaż ikonę koszyka */}
              {isAuthenticated && (
                <Link href="/profile/cart">
                  <button className="text-gray-300 hover:text-yellow-400 p-2">
                    <MdShoppingCart className="w-6 h-6" />
                  </button>
                </Link>
              )}

              {/* Przycisk profilu użytkownika, jeśli zalogowany */}
              {isAuthenticated && (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonPopoverActionButton__manageAccount: "hidden",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      href="/profile/dashboard"
                      label="Dashboard"
                      labelIcon={<MdDashboard />}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              )}

              {/* Przycisk hamburgera */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-purple-950 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                <Bars3Icon
                  className="block size-6 group-data-open:hidden"
                  aria-hidden="true"
                />
                <XMarkIcon
                  className="hidden size-6 group-data-open:block"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </div>

            <div className="flex items-center space-x-2">
              <img alt="Logo" src="/assets/book.png" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-yellow-400">
                Magic BookStore
              </span>
            </div>
            <div className="hidden lg:flex lg:ml-6">
              <div className="flex space-x-4">
                {(isAuthenticated ? authenticatedNavigation : navigation).map(
                  (item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "bg-indigo-950 text-white"
                          : "text-gray-300 hover:bg-indigo-950 hover:text-yellow-400",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="hidden lg:flex lg:ml-6">
              <div className={styles.buttonContainer}>
                {!isAuthenticated ? (
                  <>
                    <Link href="/SignUp">
                      <Buttons className={styles.SignUp}>Sign Up</Buttons>
                    </Link>
                    <Link href="/LogIn">
                      <Buttons className={`${styles.logIn} py-2 px-4 rounded`}>
                        Log In
                      </Buttons>
                    </Link>
                  </>
                ) : (
                  <>
                    {isAuthenticated && (
                      <Link href="/profile/cart">
                        <button className="text-gray-30 hover:text-yellow-400 rounded-md px-3 py-2 text-sm font-medium">
                          <MdShoppingCart className="inline-block w-6 h-6" />
                        </button>
                      </Link>
                    )}
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonPopoverActionButton__manageAccount:
                            "hidden",
                        },
                      }}
                    >
                      <UserButton.MenuItems>
                        <UserButton.Link
                          href="/profile/dashboard"
                          label="Dashboard"
                          labelIcon={<MdDashboard />}
                        />
                      </UserButton.MenuItems>
                    </UserButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <DisclosurePanel className="lg:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 text-center">
            {/* Dynamiczna nawigacja w wersji mobilnej */}
            {(isAuthenticated ? authenticatedNavigation : navigation).map(
              (item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-purple-400",
                    "block rounded-md px-3 py-2 text-base font-medium w-full hover:bg-gray-700"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              )
            )}
            <div className="mt-4 space-y-2">
              {!isAuthenticated ? (
                <>
                  <Link href="/SignUp">
                    <Buttons
                      className={`${styles.SignUp} py-2 px-4 w-full rounded`}
                    >
                      Sign Up
                    </Buttons>
                  </Link>
                  <hr />
                  <Link href="/LogIn">
                    <Buttons className={`${styles.logIn} w-full`}>
                      Log In
                    </Buttons>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <br />
      <br />
      <Banner />
    </>
  );
}
