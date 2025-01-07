import React from "react";

import { useEffect, useState } from "react";

import { MovieCard } from "../components/MovieCard";

import { ActorCard } from "../components/ActorCard";
import SearchBox from "components/SearchBox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { AuroraBackground } from "components/aurora-background";
import { OrbitHero } from "components/OrbitHero";
import Hero from "components/Hero";

// Add type for the props
interface HomeProps {
  popularMovies: any[];
  upcomingMovies: any[];
  topRatedMovies: any[];
  nowPlayingMovies: any[];
  popularActors: any[];
}

// Modify the component to accept props
export default function Home({
  popularMovies,
  nowPlayingMovies,
  topRatedMovies,
  upcomingMovies,
  popularActors,
}: HomeProps) {
  // import api key from .env file

  // state for moviews

  const [moviesTab, setMoviesTab] = useState<string>("popular");
  const [actorsTab, setActorsTab] = useState<string>("popular");
  const [isHydrated, setIsHydrated] = useState(false);

  //  create function that fetches
  //  data from the API
  // In your fetchData function
  // const fetchData = async (category: string = "popular") => {
  //   if (category !== "popular") {
  //     const movies = await fetch(`/api/movies/${category}`);
  //     const moviesData = await movies.json();
  //     setPopularMovies(moviesData);
  //   }
  // };

  // run fetchData function in useEffect
  // useEffect(() => {
  //   fetchData(moviesTab);
  // }, [moviesTab]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl lg:p-8 rounded-md flex flex-col gap-8">
      {/* Hero */}

      {/* <OrbitHero /> */}
      <Hero />

      {/* Tabs start */}
      <div className="flex flex-col gap-2 ">
        <Tabs
          // defaultValue="popular"
          value={moviesTab as string}
          onValueChange={setMoviesTab}
        >
          <TabsList className="flex w-min flex-row gap-2">
            <TabsTrigger value="popular">Popular Movies</TabsTrigger>
            <TabsTrigger value="now_playing">Now Showing</TabsTrigger>
            <TabsTrigger value="top_rated">Top Rated</TabsTrigger>
            <TabsTrigger value="upcoming" className="hidden md:block">
              Upcoming
            </TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4">
              {popularMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="now_playing">
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4">
              {nowPlayingMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="top_rated">
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4">
              {topRatedMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4">
              {upcomingMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="text-base font-normal text-muted-foreground mb-2">
          Popular Actors
        </h3>

        <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4">
          {popularActors &&
            popularActors?.map((actor) => (
              <ActorCard actor={actor} key={actor.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

// Add getStaticProps
export async function getServerSideProps() {
  // Define the base URL, fallback to relative path if NEXT_PUBLIC_API_URL is not set
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // Fetch initial data at build time
  const [
    popularMovies,
    popularActors,
    nowPlayingMovies,
    topRatedMovies,
    upcomingMovies,
  ] = await Promise.all([
    fetch(`${baseUrl}/api/movies/lists/popular`).then((res) => res.json()),
    fetch(`${baseUrl}/api/actors/popular`).then((res) => res.json()),
    fetch(`${baseUrl}/api/movies/lists/now_playing`).then((res) => res.json()),
    fetch(`${baseUrl}/api/movies/lists/top_rated`).then((res) => res.json()),
    fetch(`${baseUrl}/api/movies/lists/upcoming`).then((res) => res.json()),
  ]);

  return {
    props: {
      popularMovies,
      nowPlayingMovies,
      topRatedMovies,
      upcomingMovies,
      popularActors,
    },
    // revalidate: 3600,
  };
}
