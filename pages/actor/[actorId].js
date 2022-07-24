// get static paths

import axios from "axios";

import Image from "next/image";

import dayjs from "dayjs";
import { MovieActor } from "../../components/MovieActor";
import { AgeComponent } from "../../components/AgeComponent";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

// use getstaticpaths and getstaticprops to get data from the API from id
// export const getStaticPaths = async () => {

export async function getServerSideProps({ query }) {
  const id = query.actorId;
  const baseUrl = "https://api.themoviedb.org/3/";
  const key = "b00fb54297384d5eaa45556b05fbb775";

  const url = baseUrl + "person/" + id + "?api_key=" + key;
  const response = await axios.get(url);
  const actor = response.data;

  const url2 = baseUrl + "person/" + id + "/movie_credits?api_key=" + key;
  const response2 = await axios.get(url2);
  const credits = response2.data;

  //   get images

  const url3 = baseUrl + "person/" + id + "/images?api_key=" + key;
  const response3 = await axios.get(url3);
  const images = response3.data;

  return {
    props: {
      actor,
      credits,
      images,
    },
  };
}

const Actor = ({ actor, credits, images }) => {
  // state for number credits
  const [numberCredits, setNumberCredits] = useState(20);

  const cleanCredits = credits.cast

    .filter((c) => {
      const isValid = dayjs(c.release_date).isValid();
      console.log("isValid", isValid);
      if (isValid) {
        return c;
      }
    })

    .sort((a, b) => {
      return dayjs(b.release_date).valueOf() - dayjs(a.release_date).valueOf();
    });

  const sortedCredits = cleanCredits.slice(0, numberCredits);

  //   return array of number of movies per year
  const getMoviesPerYear = (credits) => {
    const moviesPerYear = [];
    const years = [];
    credits.cast.map((movie) => {
      const year = dayjs(movie.release_date).year();
      if (!years.includes(year)) {
        years.push(year);
      }
    });

    years.map((year) => {
      const count = credits.cast.filter((movie) => {
        return dayjs(movie.release_date).year() === year;
      }).length;
      moviesPerYear.push({ year, count });
    });

    return moviesPerYear;
  };
  // const moviesPerYear = getMoviesPerYear(credits);

  const careerLength = // get difference between first movie and last movie from sortedCredits
    dayjs(cleanCredits[0].release_date).diff(
      dayjs(cleanCredits[cleanCredits.length - 1].release_date),
      "year"
    );

  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  return (
    <div className="mx-auto max-w-7xl card">
      <div className="flex mx-auto pb-6">
        {/* Medium and Up */}
        <div className="hidden md:block">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            alt={actor.name}
            width={250}
            height={375}
          />
        </div>

        {/* Mobile */}
        <div className="block md:hidden flex-shrink  ">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            alt={actor.name}
            width={187}
            height={280}
            layout=""
          />
        </div>

        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-4xl font-bold ">{actor.name}</h1>

          <div className="flex flex-col gap-0">
            <label htmlFor="">Date of Birth</label>

            <div className="flex gap-2 items-center">
              <span className="text-lg font-medium ">
                {dayjs(actor.birthday).format("DD MMM YYYY")}
              </span>
              {!actor.deathday && (
                <AgeComponent
                  birthday={actor.birthday}
                  movieDate={dayjs().format("YYYY-MM-DD")}
                  size="small"
                />
              )}
            </div>
          </div>

          {actor.deathday && (
            <div className="flex flex-col gap-0">
              <label htmlFor="">Date of Death</label>

              <div className="flex gap-2">
                <span className="text-lg font-medium ">
                  {dayjs(actor.deathday).format("DD MMM YYYY")}
                </span>
                <div className=" flex text-sm font-bold px-2 bg-red-500/70 rounded-full m-0 items-center justify-center">
                  <span className="text-white">
                    Died at{" "}
                    {dayjs(actor.deathday).diff(dayjs(actor.birthday), "year")}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-0">
            <label htmlFor="">Place of Birth</label>
            <span className="text-lg font-medium ">{actor.place_of_birth}</span>
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="">Career Length</label>

            <span className="text-lg font-medium ">{careerLength} years</span>
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="">Number Films</label>
            <span className="text-lg font-medium ">{credits.cast.length}</span>
          </div>
        </div>

        {/* 
        <BarChart width={500} height={150} data={moviesPerYear}>
          <Bar dataKey="count" fill="#8884d8" />
          <XAxis dataKey="year" />
        </BarChart> */}

        {/* <div className="flex-grow grid grid-cols-6">
         
          {images?.profiles.map((image) => {
            return (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt={actor.name}
                width={250}
                height={375}
                key ={image.id}
              />
            );
          })}
        </div> */}
      </div>

      <h3 className="px-4">Movies</h3>
      <div className="grid grid-cols-3 gap-4 lg:gap-2 lg:grid-cols-8 xl:grid-cols-10">
        {/* map through credits in inverse time order */}
        {sortedCredits?.map((movie) => {
          return <MovieActor key={movie.id} movie={movie} actor={actor} />;
        })}
      </div>
      {/* button to show more results */}

      <div className="w-full mx-auto">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  my-4"
          onClick={() => setNumberCredits(numberCredits + 10)}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Actor;
