import React from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";

const Hero = () => {
  return (
    <div className="flex flex-col gap-4 min-h-[350px] items-center justify-center">
      <div className="text-center max-w-xl mx-auto text-balance">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r via-pink-500 from-pink-400 to-blue-500 inline-block text-transparent bg-clip-text">
          How Old Were They?
        </h1>
        <p className="text-muted-foreground text-balance w-full font-thin">
          Are you ever watching a movie and wonder how old an actor or actress
          was when it was filmed?
        </p>
      </div>
      {/* </AuroraBackground> */}

      {/* input to search for a movie */}
      <div className="flex justify-center flex-col items-center p-8">
        {/* <SearchMovie /> */}
        <SearchBox
          allowKeyboardShortcut={false}
          placeholder="Search for Movie or Actor"
        />

        {/* Try these */}

        <div className="flex justify-center gap-2 w-[350px] p-2 text-xs text-muted-foreground">
          Try:
          <Link href="/movies/115">
            <span className="text-xs text-muted-foreground w-min hover:text-primary transition-colors hover:underline">
              Big Lebowski,
            </span>
          </Link>
          <Link href="/movies/744">
            <span className="text-xs text-muted-foreground w-min hover:text-primary transition-colors hover:underline">
              Top Gun,
            </span>
          </Link>
          <Link href="/movies/603">
            <span className="text-xs text-muted-foreground w-min hover:text-primary transition-colors hover:underline">
              The Matrix
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
