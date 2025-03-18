"use client";
import { SignIn, useUser } from "@clerk/clerk-react";
import styles from "../../styles/OtherPagesStyles/LogInStyles.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/************************************************
klasa: LogInForm
opis: Komponent formularza logowania, który wykorzystuje bibliotekę `@clerk/clerk-react` do logowania użytkownika w aplikacji.
      Po udanym logowaniu użytkownik zostaje przekierowany na stronę dashboardu.
pola:
- user - obiekt reprezentujący aktualnie zalogowanego użytkownika, pobierany z hooka `useUser()`.
- isLoaded - boolean informujący o tym, czy dane użytkownika zostały załadowane.
- router - instancja routera Next.js używana do nawigacji po stronie.
autor: <numer zdającego>
************************************************/

export function LogInForm() {
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
        <div className={styles.LogInBox}>
          <div className={styles.form}>
            <h1 className={styles.h1}>✨Magic BookStore✨</h1>
            <SignIn
              appearance={{
                elements: {
                  formFieldLabel: "text-purple-600",
                  headerTitle: "text-white",
                  card: styles.LogInCard,
                  otpCodeFieldInput: styles.code,
                  formButtonPrimary: styles.LogInBtn,
                  inputField: styles.inputBox,
                  footerActionLink: styles.link,
                  socialButtonsBlockButton: styles.socialBtn,
                  footer: styles.LogInFooter,
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
