/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    // formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 300, // seconds
    domains: [
      "https://image.tmdb.org/",
      "image.tmdb.org",
      "tmdb.org",
      "themoviedb.org",
    ],
  },
};
