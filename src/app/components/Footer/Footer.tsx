"use client";
import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const router = useRouter();

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleLoginRedirect = () => router.push("/LogIn");
  const handleSignupRedirect = () => router.push("/SignUp");

  useEffect(() => {
    if (isModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isModalOpen]);

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Please Contact Us</h4>
            <ul>
              <li>
                <div className="telNumber">+48 000 000 000</div>
              </li>
              <li>bookstore@magicalBooks.pl</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Discover</h4>
            <ul>
              <li>
                <a href="/aboutus">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <button
                  className="link"
                  onClick={() =>
                    openModal("Privacy Policy", `
                    <p>At MagicBookStore, we respect and value your privacy. The following outlines how we handle your personal information:</p>
                    <ul>
                      <li><strong>Information We Collect:</strong> We collect personal information such as your name, email address, shipping address, and payment details when you place an order or register on our website.<br>
                      <br><li><strong>Use of Information:</strong> Your information is used solely for processing orders, providing customer support, and sending promotional materials if you have opted-in.</li>
                      <br><li><strong>Data Protection:</strong> We ensure your data is protected using encryption technologies and do not share your information with third parties, unless necessary for order processing (e.g., shipping companies).</li>
                      <br><li><strong>Cookies:</strong> We use cookies to enhance your shopping experience, including remembering your preferences and cart items.</li>
                      <br><li><strong>Your Rights:</strong> You have the right to access, modify, or delete your personal data. Please contact us if you wish to do so.</li>
                    </ul><br>
                    <p>If you have any questions or concerns, please reach out to us at bookstore@magicalBooks.pl.</p>`)
                  }
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className="link"
                  onClick={() =>
                    openModal(
                      "FAQs",
                      `   <h5>Frequently Asked Questions (FAQs)</h5>
                      <p>Here are some of the most commonly asked questions:</p>
                      <ul>
                        <li><strong>How do I place an order?</strong> To place an order, simply browse our catalog, add the books you want to your cart, and proceed to checkout.</li><br>
                        <li><strong>What payment methods do you accept?</strong> We accept PayPal, credit cards (Visa, MasterCard, American Express), and other secure payment methods.</li><br>
                        <li><strong>How can I track my order?</strong> Once your order is shipped, you will receive a tracking number via email to track your delivery.</li><br>
                        <li><strong>Can I cancel my order?</strong> Orders can be canceled within 24 hours of placing the order. Please contact us immediately if you need to cancel.</li><br>
                        <li><strong>What is your return policy?</strong> We offer a 30-day return policy for undamaged books. Returns must be initiated through our customer support.</li><br>
                        <li><strong>Do you ship internationally?</strong> Currently, we only ship within Poland. International shipping is not yet available, but we hope to offer this in the future.</li><br>
                      </ul>
                      <p>If you have other questions, feel free to contact our support team at bookstore@magicalBooks.pl.</p>`
                    )
                  }
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Shopping</h4>
            <ul>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Order Status</a>
              </li>
              <li>
                <a href="#">Payment Options</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links flex space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon bg-gray-800 hover:bg-blue-600"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon bg-gray-800 hover:bg-blue-400"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon bg-gray-800 hover:bg-pink-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon bg-gray-800 hover:bg-blue-700"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="copyright">Copyright © 2025 MagicBookStore</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>{modalContent.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
            <div className="modalButtons">
              <button onClick={closeModal} className="closeModalBtn">Close</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
