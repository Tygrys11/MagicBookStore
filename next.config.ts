/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["covers.openlibrary.org"], // Dodaj dozwolony host dla obrazków
  },
};

module.exports = nextConfig;
