import { BookOpen, Gift, Truck, Bell } from "lucide-react";

/************************************************
klasa: MagicalFeatures
opis: Komponent wyświetlający sekcję z funkcjami oferowanymi przez Magic Bookstore, w tym bibliotekę, zniżki, dostawę i powiadomienia.
pola:
  features - tablica obiektów zawierająca funkcje sklepu z ikoną, tytułem i opisem
autor: <numer zdającego>
************************************************/

const features = [
    {
      icon: <BookOpen size={50} className="text-purple-600" />,
      title: "Endless Library",
      description:
        "Our scrolls and books contain over 13 million magical stories, from ancient legends to modern wizarding tales. Discover books full of mysteries!",
    },
    {
      icon: <Gift size={50} className="text-purple-600" />,
      title: "Magical Discounts & Enchanted Prices",
      description:
        "Join our wizard guild and take advantage of exclusive promotions. Magical coupons, discounts, and surprises await you!",
    },
    {
      icon: <Truck size={50} className="text-purple-600" />,
      title: "Owl Delivery – Free of Charge",
      description:
        "Our delivery owls will bring your order at no extra cost if you meet the magical order criteria!",
    },
    {
      icon: <Bell size={50} className="text-purple-600" />,
      title: "Notification Spells",
      description:
        "Add books to your Wishlist, and we will notify you with a magic spell as soon as they become available.",
    },
  ];
  

export default function MagicalFeatures() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-purple-300 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
