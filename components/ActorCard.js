import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { AgeComponent } from "./AgeComponent";



export const ActorCard = ({ actor }) => {
  console.log("actor", actor);
  return (
    <Link href={`/actor/${actor.id}`}>
      <div className="card flex flex-col   animate transition-all ease-in-out hover:scale-105 cursor-pointer overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.title}
          height={750}
          width={500}
        />
        <div className="flex flex-col w-full items-start justify-start p-2 text-clip">
          <h6 className="font-semibold text-sm  truncate">{actor.name}</h6>

          <div className="flex w-full flex-row gap-2">
            {/* <label>{dayjs(movie.release_date).format("YYYY")}</label> */}
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};
