/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import {
  ClapperboardIcon,
  Search,
  User,
  UserCircle,
  UserIcon,
} from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import Imagio from "./Imagio";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";

interface SearchBoxProps {
  placeholder?: string;
  delay?: number;
  allowKeyboardShortcut?: boolean;
}

export default function SearchBox({
  placeholder = "Search for Movie or Actor",
  delay = 400,
  allowKeyboardShortcut = true,
}: SearchBoxProps) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMovies, setShowMovies] = useState(true);
  const [showActors, setShowActors] = useState(true);

  //   console.log("DATA", data);
  // Add keyboard shortcut handler
  useEffect(() => {
    if (!allowKeyboardShortcut) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Move searchMovies into useCallback to maintain reference stability
  const searchMovies = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery) {
        setData([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search-movies?query=${encodeURIComponent(
            searchQuery
          )}&page=${page}`
        );
        const data = await response.json();
        setData(data.results);
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  // Remove the separate onSearch function and use searchMovies directly
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      searchMovies(query);
    }, delay),
    [searchMovies, delay]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    debouncedSearch(newValue);
  };

  // Add this SearchSkeleton component
  const SearchSkeleton = () => (
    <div className="flex items-center gap-2 text-sm p-2 rounded-md">
      <Skeleton className="h-[50px] w-[40px] rounded-md" />
      <div className="flex flex-col gap-2 flex-grow">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  );

  const startingData = [
    {
      backdrop_path: "/icmmSD4vTTDKOq2vvdulafOGw93.jpg",
      id: 603,
      title: "The Matrix",
      original_title: "The Matrix",
      overview:
        "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
      poster_path: "/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
      media_type: "movie",
      adult: false,
      original_language: "en",
      genre_ids: [28, 878],
      popularity: 131.479,
      release_date: "1999-03-31",
      video: false,
      vote_average: 8.219,
      vote_count: 25794,
    },
    {
      backdrop_path: "/oOv2oUXcAaNXakRqUPxYq5lJURz.jpg",
      id: 155,
      title: "The Dark Knight",
      original_title: "The Dark Knight",
      overview:
        "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      media_type: "movie",
      adult: false,
      original_language: "en",
      genre_ids: [18, 28, 80, 53],
      popularity: 171.815,
      release_date: "2008-07-16",
      video: false,
      vote_average: 8.517,
      vote_count: 33088,
    },
    {
      backdrop_path: "/mbYTRO33LJAgpCMrIn9ibiWHbMH.jpg",
      id: 346698,
      title: "Barbie",
      original_title: "Barbie",
      overview:
        "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
      poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
      media_type: "movie",
      adult: false,
      original_language: "en",
      genre_ids: [35, 12],
      popularity: 134.694,
      release_date: "2023-07-19",
      video: false,
      vote_average: 6.997,
      vote_count: 9294,
    },
    // ACTORS
    {
      id: 287,
      name: "Brad Pitt",
      original_name: "Brad Pitt",
      media_type: "person",
      adult: false,
      popularity: 80.316,
      gender: 2,
      known_for_department: "Acting",
      profile_path: "/4rjnRCQ6bGFYdBb4UooOjsQy12c.jpg",
      known_for: [
        {
          backdrop_path: "/1Jpkm9qZcsT0mSyVXgs4VlGjPNI.jpg",
          id: 16869,
          title: "Inglourious Basterds",
          original_title: "Inglourious Basterds",
          overview:
            'In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as "The Basterds" are chosen specifically to spread fear throughout the Third Reich by scalping and brutally killing Nazis. The Basterds, lead by Lt. Aldo Raine soon cross paths with a French-Jewish teenage girl who runs a movie theater in Paris which is targeted by the soldiers.',
          poster_path: "/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [18, 53, 10752],
          popularity: 93.655,
          release_date: "2009-08-02",
          video: false,
          vote_average: 8.2,
          vote_count: 22318,
        },
        {
          backdrop_path: "/kg2FOT2Oe5PSCgs3L4vLel6B7ck.jpg",
          id: 72190,
          title: "World War Z",
          original_title: "World War Z",
          overview:
            "Life for former United Nations investigator Gerry Lane and his family seems content. Suddenly, the world is plagued by a mysterious infection turning whole human populations into rampaging mindless zombies. After barely escaping the chaos, Lane is persuaded to go on a mission to investigate this disease. What follows is a perilous trek around the world where Lane must brave horrific dangers and long odds to find answers before human civilization falls.",
          poster_path: "/aCnVdvExw6UWSeQfr0tUH3jr4qG.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [28, 27, 878, 53],
          popularity: 113.52,
          release_date: "2013-06-19",
          video: false,
          vote_average: 6.821,
          vote_count: 15398,
        },
        {
          backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
          id: 550,
          title: "Fight Club",
          original_title: "Fight Club",
          overview:
            'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
          poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [18],
          popularity: 115.18,
          release_date: "1999-10-15",
          video: false,
          vote_average: 8.4,
          vote_count: 29575,
        },
      ],
    },
    {
      id: 6885,
      name: "Charlize Theron",
      original_name: "Charlize Theron",
      media_type: "person",
      adult: false,
      popularity: 59.485,
      gender: 1,
      known_for_department: "Acting",
      profile_path: "/1hpjbiC7zcyQYRYhx3boBDR5gKu.jpg",
      known_for: [
        {
          backdrop_path: "/gqrnQA6Xppdl8vIb2eJc58VC1tW.jpg",
          id: 76341,
          title: "Mad Max: Fury Road",
          original_title: "Mad Max: Fury Road",
          overview:
            "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
          poster_path: "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [28, 12, 878],
          popularity: 110.588,
          release_date: "2015-05-13",
          video: false,
          vote_average: 7.618,
          vote_count: 22666,
        },
        {
          backdrop_path: "/g3hni0i9iAQ13jDGOFWavJFlojc.jpg",
          id: 341013,
          title: "Atomic Blonde",
          original_title: "Atomic Blonde",
          overview:
            "An undercover MI6 agent is sent to Berlin during the Cold War to investigate the murder of a fellow agent and recover a missing list of double agents.",
          poster_path: "/kV9R5h0Yct1kR8Hf8sJ1nX0Vz4x.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [28, 12, 53],
          popularity: 32.282,
          release_date: "2017-07-26",
          video: false,
          vote_average: 6.4,
          vote_count: 6194,
        },
        {
          backdrop_path: "/qndvrOXGyoOxkhc12SqfLi9Hr31.jpg",
          id: 8960,
          title: "Hancock",
          original_title: "Hancock",
          overview:
            "Hancock is a down-and-out superhero who's forced to employ a PR expert to help repair his image when the public grows weary of all the damage he's inflicted during his lifesaving heroics. The agent's idea of imprisoning the antihero to make the world miss him proves successful, but will Hancock stick to his new sense of purpose or slip back into old habits?",
          poster_path: "/7DyuV2G0hLEqHeueDfOqhZ2DVut.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [14, 28],
          popularity: 35.128,
          release_date: "2008-07-01",
          video: false,
          vote_average: 6.348,
          vote_count: 9581,
        },
      ],
    },
    {
      id: 72129,
      name: "Jennifer Lawrence",
      original_name: "Jennifer Lawrence",
      media_type: "person",
      adult: false,
      popularity: 36.737,
      gender: 1,
      known_for_department: "Acting",
      profile_path: "/k6CsASaySnS3ag0Y2Ns2vqPahVn.jpg",
      known_for: [
        {
          backdrop_path: "/3kz6mLESBmdxAJwoHMS5YYfoWLE.jpg",
          id: 70160,
          title: "The Hunger Games",
          original_title: "The Hunger Games",
          overview:
            "Every year in the ruins of what was once North America, the nation of Panem forces each of its twelve districts to send a teenage boy and girl to compete in the Hunger Games.  Part twisted entertainment, part government intimidation tactic, the Hunger Games are a nationally televised event in which “Tributes” must fight with one another until one survivor remains.  Pitted against highly-trained Tributes who have prepared for these Games their entire lives, Katniss is forced to rely upon her sharp instincts as well as the mentorship of drunken former victor Haymitch Abernathy.  If she’s ever to return home to District 12, Katniss must make impossible choices in the arena that weigh survival against humanity and life against love. The world will be watching.",
          poster_path: "/yXCbOiVDCxO71zI7cuwBRXdftq8.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [878, 12, 14],
          popularity: 46.477,
          release_date: "2012-03-12",
          video: false,
          vote_average: 7.213,
          vote_count: 21978,
        },
        {
          backdrop_path: "/48gojWXx1G2Bs0KFtXYfNJ2naDr.jpg",
          id: 101299,
          title: "The Hunger Games: Catching Fire",
          original_title: "The Hunger Games: Catching Fire",
          overview:
            'Katniss Everdeen has returned home safe after winning the 74th Annual Hunger Games along with fellow tribute Peeta Mellark. Winning means that they must turn around and leave their family and close friends, embarking on a "Victor\'s Tour" of the districts. Along the way Katniss senses that a rebellion is simmering, but the Capitol is still very much in control as President Snow prepares the 75th Annual Hunger Games (The Quarter Quell) - a competition that could change Panem forever.',
          poster_path: "/uFQbcR7h1stMlN1d3a7RmV0luLZ.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [12, 28, 878],
          popularity: 64.243,
          release_date: "2013-11-15",
          video: false,
          vote_average: 7.428,
          vote_count: 17340,
        },
        {
          backdrop_path: "/tFlSDoWQsAZ2qjICKzfP5Yw6zM5.jpg",
          id: 131631,
          title: "The Hunger Games: Mockingjay - Part 1",
          original_title: "The Hunger Games: Mockingjay - Part 1",
          overview:
            "Katniss Everdeen reluctantly becomes the symbol of a mass rebellion against the autocratic Capitol.",
          poster_path: "/4FAA18ZIja70d1Tu5hr5cj2q1sB.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [878, 12, 53],
          popularity: 86.852,
          release_date: "2014-11-19",
          video: false,
          vote_average: 6.812,
          vote_count: 15807,
        },
      ],
    },
    {
      id: 3895,
      name: "Michael Caine",
      original_name: "Michael Caine",
      media_type: "person",
      adult: false,
      popularity: 39.198,
      gender: 2,
      known_for_department: "Acting",
      profile_path: "/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg",
      known_for: [
        {
          backdrop_path: "/9REO1DLpmwhrBJY3mYW5eVxkXFM.jpg",
          id: 157336,
          title: "Interstellar",
          original_title: "Interstellar",
          overview:
            "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
          poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [12, 18, 878],
          popularity: 219.903,
          release_date: "2014-11-05",
          video: false,
          vote_average: 8.445,
          vote_count: 35919,
        },
        {
          backdrop_path: "/ew5FcYiRhTYNJAkxoVPMNlCOdVn.jpg",
          id: 272,
          title: "Batman Begins",
          original_title: "Batman Begins",
          overview:
            "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
          poster_path: "/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [28, 80, 18],
          popularity: 66.668,
          release_date: "2005-06-10",
          video: false,
          vote_average: 7.711,
          vote_count: 21040,
        },
        {
          backdrop_path: "/oOv2oUXcAaNXakRqUPxYq5lJURz.jpg",
          id: 155,
          title: "The Dark Knight",
          original_title: "The Dark Knight",
          overview:
            "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
          poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [18, 28, 80, 53],
          popularity: 171.815,
          release_date: "2008-07-16",
          video: false,
          vote_average: 8.517,
          vote_count: 33093,
        },
      ],
    },
  ];

  const handleOptionClick = () => {
    setOpen(false);
    setSearch("");
    setData([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={placeholder ? placeholder : `Search...`}
            className="text-sm p-2 pl-9 pr-20 bg-muted w-full  sm:w-[361px]"
            readOnly
          />
          <div className=" text-xs text-muted-foreground pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            ⌘K
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col p-0 min-h-[400px] shadow-pink-500/30 shadow-2xl">
        <div className="relative bg-muted/50">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={handleChange}
            placeholder={placeholder}
            className="text-2xl font-medium p-6 pl-9 bg-transparent w-full border-0 focus-visible:ring-0 focus:outline-none"
            autoFocus
          />
        </div>
        <div className="flex-grow max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="grid gap-2 p-4">
              {[...Array(5)].map((_, i) => (
                <SearchSkeleton key={i} />
              ))}
            </div>
          ) : data?.length > 0 ? (
            <div className="grid gap-2 p-4 flex-grow">
              <div className="p-2 flex gap-2 bg-background/10">
                <Toggle
                  pressed={showMovies}
                  onPressedChange={setShowMovies}
                  size="sm"
                  variant="outline"
                >
                  <ClapperboardIcon className="size-4" />
                  Movies
                </Toggle>
                <Toggle
                  pressed={showActors}
                  onPressedChange={setShowActors}
                  size="sm"
                  variant="outline"
                >
                  <UserIcon className="size-4" />
                  Actors
                </Toggle>
              </div>
              {data
                .filter((item: any) => {
                  if (item.media_type === "movie" && !showMovies) return false;
                  if (item.media_type === "person" && !showActors) return false;
                  return true;
                })
                .map((item: any) => {
                  // Movie
                  if (item.media_type === "movie") {
                    return (
                      <Link
                        href={`/movies/${item.id}`}
                        key={item.id}
                        onClick={handleOptionClick}
                      >
                        <div
                          key={item.id}
                          className="flex items-center flex-grow gap-2 text-sm cursor-pointer hover:bg-muted p-2 rounded-md"
                        >
                          <div className="w-10">
                            <Imagio
                              url={item.poster_path}
                              alt={item.title}
                              width={40}
                              height={50}
                              isMovie={true}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start flex-grow">
                            <span className="font-medium text-base">
                              {item.title}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {dayjs(item.release_date).format("YYYY")}
                            </span>
                            {/* Top cast */}
                          </div>
                        </div>
                      </Link>
                    );
                  }
                  // Actor
                  if (item.media_type === "person") {
                    return (
                      <Link
                        href={`/actor/${item.id}`}
                        key={item.id}
                        onClick={handleOptionClick}
                      >
                        <div
                          key={item.id}
                          className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted p-2 rounded-md"
                        >
                          <div className="w-10 ">
                            <Imagio
                              url={item.profile_path}
                              alt={item.name}
                              width={40}
                              height={50}
                              isMovie={false}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <span className="font-medium text-sm">
                              {item.name}
                            </span>
                            <div className="flex gap-2 items-center">
                              <span className="text-muted-foreground text-xs">
                                {item.known_for
                                  ?.slice(0, 1)
                                  .map(
                                    (movie: any) =>
                                      movie.title +
                                      " (" +
                                      dayjs(movie.release_date).format("YYYY") +
                                      ")"
                                  )
                                  .join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
            </div>
          ) : (
            // POPULAR SEARCHES
            <div className="grid gap-2 p-4">
              <h6 className="">Popular Searches</h6>
              {startingData
                .filter((item: any) => {
                  if (item.media_type === "movie" && !showMovies) return false;
                  if (item.media_type === "person" && !showActors) return false;
                  return true;
                })
                .map((item: any) => {
                  // Movie
                  if (item.media_type === "movie") {
                    return (
                      <Link
                        href={`/movies/${item.id}`}
                        key={item.id}
                        onClick={handleOptionClick}
                      >
                        <div className="flex items-center flex-grow gap-2 text-sm cursor-pointer hover:bg-muted p-2 rounded-md">
                          <div className="w-10">
                            <Imagio
                              url={item.poster_path}
                              alt={item.title}
                              width={40}
                              height={50}
                              isMovie={true}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start flex-grow">
                            <span className="font-medium text-base">
                              {item.title}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {dayjs(item.release_date).format("YYYY")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                  // Actor
                  if (item.media_type === "person") {
                    return (
                      <Link
                        href={`/actor/${item.id}`}
                        key={item.id}
                        onClick={handleOptionClick}
                      >
                        <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted p-2 rounded-md">
                          <div className="w-10 ">
                            <Imagio
                              url={item.profile_path}
                              alt={item.name}
                              width={40}
                              height={50}
                              isMovie={false}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <span className="font-medium text-sm">
                              {item.name}
                            </span>
                            <div className="flex gap-2 items-center">
                              <span className="text-muted-foreground text-xs">
                                {item.known_for
                                  ?.slice(0, 1)
                                  .map(
                                    (movie: any) =>
                                      movie.title +
                                      " (" +
                                      dayjs(movie.release_date).format("YYYY") +
                                      ")"
                                  )
                                  .join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
