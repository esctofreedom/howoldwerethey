/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  compiler:
    // removes console logs in production
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error"],
          },
        }
      : undefined,
  // env: {
  //   NEXT_PUBLIC_NEXT_PUBLIC_API_URL:
  //     process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL,
  // },
};

module.exports = nextConfig;
