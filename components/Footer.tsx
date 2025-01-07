/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-background p-4">
      <div className="max-w-7xl mx-auto py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-sm text-muted-foreground">
        <Link
          href="/api"
          className="hover:text-foreground transition-colors flex items-center gap-2"
        >
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB Logo"
            className="h-3"
          />
          <span className="text-xs text-muted-foreground">
            Data provided by TMDB
          </span>
        </Link>

        <div>
          Made with ❤️ by{" "}
          <a
            href="https://ricardcodes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Ricard Codes
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
