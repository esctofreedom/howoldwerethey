import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ActorCard } from "components/ActorCard";
import { AgeComponent } from "components/AgeComponent";
import Imagio from "components/Imagio";
import { MovieCard } from "components/MovieCard";
import dayjs from "dayjs";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Grid2X2,
  List,
  BarChart,
  LucideIcon,
  BabyIcon,
  GlobeIcon,
  MapPinIcon,
  CalendarIcon,
  FilmIcon,
  SkullIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ActorBarChart } from "components/ActorBarChart";
import { motion } from "framer-motion";

interface ActorProps {
  actor: any; // Replace 'any' with your actor type
}

export default function ActorPage({ actor }: ActorProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [sortAscending, setSortAscending] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [actorImage, setActorImage] = useState<string | undefined>(undefined);
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (actor?.images?.profiles?.length > 0) {
      setActorImage(actor.images.profiles[0].file_path);
    }
  }, [actor]);

  const images = actor?.images?.profiles;

  // Handle image cycling on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && images?.length > 1) {
      interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1000); // Change image every second while hovering
    }

    // Cleanup interval and reset to first image when not hovering
    return () => {
      clearInterval(interval);
      if (!isHovered) {
        setImageIndex(0);
      }
    };
  }, [isHovered, images?.length]);

  // Preload next image
  useEffect(() => {
    if (images?.length > 1) {
      const nextIndex = (imageIndex + 1) % images.length;
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w500${images[nextIndex].file_path}`;
    }
  }, [imageIndex, images]);

  if (!isHydrated) return null;
  if (!actor) return <div>Actor not found</div>;

  console.log("actor", actor);

  const InfoRow = ({
    label,
    Icon,
    value,
  }: {
    label: string;
    Icon?: LucideIcon;
    value: any;
  }) => {
    return (
      <div className="flex w-full md:justify-between justify-start items-start md:items-center flex-col md:flex-row">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <Label> {label}</Label>
        </div>
        <span className="text-base text-foreground font-medium truncate">
          {value}
        </span>
      </div>
    );
  };

  const isDead = actor.deathday ? true : false;

  const firstMovie = actor.credits.cast
    .filter((movie) => movie.release_date)
    .sort((a, b) => dayjs(a.release_date).diff(dayjs(b.release_date)))[0];

  const latestReleasedMovie = actor.credits.cast
    .filter((movie) => movie.release_date)
    .sort((a, b) => dayjs(b.release_date).diff(dayjs(a.release_date)))[0];

  const careerLength = isDead
    ? dayjs(actor.deathday).diff(firstMovie.release_date, "year")
    : dayjs(latestReleasedMovie.release_date).diff(
        firstMovie.release_date,
        "year"
      );

  const sortedMovies = sortAscending
    ? actor.credits.cast.sort((a, b) =>
        dayjs(a.release_date).diff(dayjs(b.release_date))
      )
    : actor.credits.cast.sort((a, b) =>
        dayjs(b.release_date).diff(dayjs(a.release_date))
      );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="flex flex-col   max-w-6xl mx-auto justify-center items-center p-2 w-full ">
      {/* TOp Area */}
      <div className="flex gap-6 max-w-3xl mx-auto  ">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Imagio
            url={images?.[imageIndex]?.file_path || actor.profile_path}
            alt={actor.name}
            width={350}
            height={550}
            isMovie={false}
            className="rounded-lg transition-opacity duration-500 ease-in-out"
            // style={{
            //   opacity: 1,
            //   willChange: "opacity",
            // }}
          />
        </div>
        {/* <ActorCard actor={actor} />  */}
        <div className="flex flex-col gap-4  flex-grow w-full ">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">{actor.name} </h1>
            <AgeComponent
              birthday={actor.birthday}
              deathDate={actor.deathday}
              size=""
              movieDate={dayjs().format("YYYY-MM-DD")}
            />
          </div>
          <InfoRow
            label="Date of Birth"
            Icon={BabyIcon}
            value={
              <div className="flex items-center gap-2">
                <span>{dayjs(actor.birthday).format("DD MMMM YYYY")}</span>
                {/* <AgeComponent
                  birthday={actor.birthday}
                  deathDate={actor.deathday}
                  size=""
                  movieDate={dayjs().format("YYYY-MM-DD")}
                /> */}
              </div>
            }
          />
          <InfoRow
            label="Place of Birth"
            Icon={MapPinIcon}
            value={actor.place_of_birth}
          />
          {actor.deathday && (
            <div className="flex items-center gap-2">
              <InfoRow
                label="Deathday"
                Icon={SkullIcon}
                value={dayjs(actor.deathday).format("DD MMMM YYYY")}
              />
              <AgeComponent
                birthday={actor.birthday}
                deathDate={null}
                size="sm"
                movieDate={actor.deathday}
              />
            </div>
          )}
          <InfoRow
            label="Career Length"
            Icon={CalendarIcon}
            value={
              <div className="flex items-center gap-1">
                <span>{careerLength}</span>
                <span className="text-muted-foreground text-sm">years</span>
              </div>
            }
          />
          <InfoRow
            label="Number of Movies"
            Icon={FilmIcon}
            value={
              <div className="flex items-center gap-1">
                <span>{actor.credits.cast.length}</span>
                <span className="text-muted-foreground text-sm">movies</span>
              </div>
            }
          />

          <ScrollArea className="h-[100px]">
            <div className="flex flex-col gap-2 text-muted-foreground text-sm">
              {actor.biography}
            </div>
          </ScrollArea>

          {/* <p className="text-sm text-gray-500">{actor.biography}</p> */}
        </div>
      </div>
      <Separator className="max-w-3xl mx-auto w-full my-4" />
      {/* New Tabs Section */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="">
          <TabsTrigger value="grid">
            <Grid2X2 className="h-4 w-4 mr-2" />
            Grid
          </TabsTrigger>
          {/* <TabsTrigger value="list">
            <List className="h-4 w-4 mr-2" />
            List
          </TabsTrigger> */}
          <TabsTrigger value="chart">
            <BarChart className="h-4 w-4 mr-2" />
            Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="w-full">
          <motion.div
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedMovies.map((movie) => (
              <motion.div key={movie.id} variants={cardVariants}>
                <MovieCard
                  movie={movie}
                  actorBirthdate={actor.birthday}
                  actorDeathDate={actor.deathday}
                />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="list" className="w-full max-w-3xl mx-auto">
          {Object.entries(
            sortedMovies.reduce((acc, movie) => {
              const year = dayjs(movie.release_date).format("YYYY");
              if (!acc[year]) acc[year] = [];
              acc[year].push(movie);
              return acc;
            }, {} as Record<string, typeof sortedMovies>)
          ).map(([year, movies]) => (
            <div key={year} className="flex gap-4 border-b py-4">
              <div className="font-bold text-xl w-20">{year}</div>
              <div className="flex flex-wrap gap-2">
                {(movies as any[]).map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    actorBirthdate={actor.birthday}
                    actorDeathDate={actor.deathday}
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="chart">
          <div className="max-w-3xl mx-auto w-full h-[400px]">
            {/* Add your chart component here */}
            <ActorBarChart movies={sortedMovies} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all actor IDs
  const paths = [];

  return {
    paths,
    fallback: false, // or 'blocking' if you want to generate new pages on demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/actors/${params?.actorId}`
    );
    const actor = await res.json();

    return {
      props: {
        actor,
      },
      revalidate: 60, // Optional: revalidate every 60 seconds
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
