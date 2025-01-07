import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";
import Image from "next/image";
import Imagio from "./Imagio";
import { ActorCard } from "./ActorCard";
import { Movie } from "pages/movies/[id]";

type MovieActorsOrbit = {
  movieTitle: string;
  posterUrl: string;
  cast: { name: string; faceUrl: string; age: number }[];
};

export function OrbitHero() {
  const outerCircle: MovieActorsOrbit[] = [
    {
      movieTitle: "The Dark Knight",
      posterUrl: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      cast: [
        {
          name: "Christian Bale",
          faceUrl: "/2y4doWX4lCzDMjCL5KOA4KBz6Hn.jpg",
          age: 48,
        },
        {
          name: "Heath Ledger",
          faceUrl: "/2y4doWX4lCzDMjCL5KOA4KBz6Hn.jpg",
          age: 28,
        },
      ],
    },
  ];
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="flex flex-col gap-4">
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

          {/* <div className="flex justify-center gap-2 w-[350px] p-2 text-xs text-muted-foreground">
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
          </div> */}
        </div>
      </div>

      <OrbitingCircles iconSize={40} radius={200}>
        {/* create a circle to test */}

        {dummyMovies.map((movie) => (
          <MovieActorsOrbit key={movie.title} data={movie} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        {dummyMovies.map((movie) => (
          <MovieActorsOrbit key={movie.title} data={movie} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const MovieActorsOrbit = ({ data }: { data: Movie }) => {
  return (
    <div className="relative border-green-500 border-2 h-[100px] w-[400px]">
      <div className="w-[120px] h-[50px] bg-red-500">
        <Imagio
          url={data.poster_path}
          alt={data.title}
          width={200}
          height={200}
          isMovie={true}
        />
      </div>

      {data.credits.cast[0] && (
        <div className="absolute -bottom-[30px] -right-[10px] w-[100px] rounded-lg overflow-hidden">
          <ActorCard actor={data.credits.cast[0]} />
        </div>
      )}
    </div>
  );
};

const dummyMovies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    credits: {
      cast: [
        {
          adult: false,
          gender: 2,
          id: 3894,
          known_for_department: "Acting",
          name: "Christian Bale",
          original_name: "Christian Bale",
          popularity: 54.534,
          profile_path: "/2y4doWX4lCzDMjCL5KOA4KBz6Hn.jpg",
          cast_id: 35,
          character: "Bruce Wayne",
          credit_id: "52fe4220c3a36847f8005d17",
          order: 0,
          birthday: "1974-01-30",
        },
        {
          adult: false,
          gender: 2,
          id: 1810,
          known_for_department: "Acting",
          name: "Heath Ledger",
          original_name: "Heath Ledger",
          popularity: 29.122,
          profile_path: "/5Y9HnYYa9jF4NunY9lSgJGjSe8E.jpg",
          cast_id: 3,
          character: "Joker",
          credit_id: "52fe421fc3a36847f8005cbf",
          order: 1,
          birthday: "1974-01-30",
        },
      ],
    },
  },
];
