"use client";
import { useEffect } from "react";
import styles from "../../styles/OtherPagesStyles/SignUpStyles.module.css";
import { SignUp, useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

/************************************************
klasa: SignUpForm
opis: Komponent formularza rejestracji, który wykorzystuje bibliotekę `@clerk/clerk-react` do rejestracji użytkownika w aplikacji. 
      Po udanej rejestracji użytkownik zostaje przekierowany na stronę dashboardu.
pola:
- user - obiekt reprezentujący aktualnie zalogowanego użytkownika, pobierany z hooka `useUser()`.
- isLoaded - boolean informujący o tym, czy dane użytkownika zostały załadowane.
- router - instancja routera Next.js używana do nawigacji po stronie.
autor: <numer zdającego>
************************************************/

export function SignUpForm() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.replace("/dashBoard/home");
    }
  }, [user, isLoaded, router]);

  return (
    <div className={styles.fullBox}>
      <div className={styles.container}>
        <div className={styles.signUpBox}>
          <div className={styles.form}>
            <h1 className={styles.h1}>✨Magic BookStore✨</h1>
            <SignUp
              appearance={{
                elements: {
                  formFieldLabel: "text-purple-600",
                  headerTitle: "text-white",
                  card: styles.signUpCard,
                  otpCodeFieldInput: styles.code,
                  formButtonPrimary: styles.signUpBtn,
                  inputField: styles.inputBox,
                  footerActionLink: styles.link,
                  socialButtonsBlockButton: styles.socialBtn,
                  footer: styles.signUpFooter,
                },
              }}
              afterSignUpUrl="/dashBoard/home"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
