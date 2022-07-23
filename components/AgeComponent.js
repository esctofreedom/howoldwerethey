import React from "react";
import dayjs from "dayjs";

export const ageColor = (age) => {
  if (age < 18) {
    return "bg-sky-300";
  } else if (age < 30) {
    return "bg-sky-400";
  } else if (age < 40) {
    return "bg-sky-500";
  } else if (age < 50) {
    return "bg-sky-600";
  } else if (age < 60) {
    return "bg-sky-700";
  } else if (age < 70) {
    return "bg-sky-800";
  } else {
    return "bg-sky-900";
  }
};

export const AgeComponent = ({ birthday, movieDate, size }) => {
  // calculate age from birthday using dayjs

  const age = dayjs(movieDate).diff(dayjs(birthday), "year");

  const bgColor = ageColor(age);

  if (size !== "small") {
    return (
      <div
        className={` w-[3rem] h-[3rem] flex ${bgColor} rounded-full items-center justify-center`}
      >
        <span className="text-white text-xl font-bold ">{age}</span>
      </div>
    );
  } else {
    return (
      <div
        className={` w-[1.5rem] h-[1.5rem] flex ${bgColor} rounded-full items-center justify-center`}
      >
        <span className="text-white text-xs font-bold ">{age}</span>
      </div>
    );
  }
};
