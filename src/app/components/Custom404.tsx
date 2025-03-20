'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Przekierowanie po 5 sekundach
    const timer = setTimeout(() => {
      router.push('/'); // Przekierowanie na stronę główną
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-1000 via-purple-800 to-indigo-950">
      <div className="p-8 rounded-xl shadow-xl max-w-lg w-full text-center text-yellow-400">
        <h1 className="text-5xl font-extrabold text-yellow-300">404 - Page Not Found</h1>
        <p className="text-xl text-fuchsia-200 mt-4">You need to be logged in to access this page.</p>
        <p className="text-lg text-fuchsia-100 mt-2">Redirecting to the home page...</p>
      </div>
    </div>
  );
}
