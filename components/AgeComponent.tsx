import React, { useState } from "react";
import dayjs from "dayjs";

export const AgeComponent = ({ birthday, deathDate, movieDate, size }) => {
  // calculate age from birthday using dayjs

  let age;
  // if movie date is after actor's death set age to "PH"
  if (deathDate && dayjs(movieDate).isAfter(dayjs(deathDate))) {
    age = "PH";
  } else {
    age = dayjs(movieDate).diff(dayjs(birthday), "year");
  }

  let color: string;
  let gradient: string;

  if (age < 18) {
    color = "lime";
    gradient = "from-lime-400 to-lime-600";
  } else if (age < 30) {
    color = "green";
    gradient = "from-green-400 to-green-600";
  } else if (age < 40) {
    color = "green";
    gradient = "from-green-400 to-green-600";
  } else if (age < 50) {
    color = "emerald";
    gradient = "from-emerald-400 to-emerald-600";
  } else if (age < 60) {
    color = "amber";
    gradient = "from-yellow-400 to-yellow-600";
  } else if (age < 70) {
    color = "orange";
    gradient = "from-amber-400 to-amber-600";
  } else if (age < 80) {
    color = "red";
    gradient = "from-orange-400 to-orange-600";
  } else if (age < 90) {
    color = "red";
    gradient = "from-red-400 to-red-600";
  } else {
    color = "gray";
    gradient = "from-gray-400 to-gray-600";
  }

  // console.log("age", age);

  const bgColor = color;

  const offset = 100 - 0.7 * 100;

  const height = 10;

  const thickness = height / 10;

  const halfThickness = thickness / 2;

  // viewbox is origin x, origin y, width, height
  const viewBox = `${height / 2 - halfThickness} ${
    height / 2 - halfThickness
  } ${height + halfThickness} ${height + halfThickness}`;

  const ageNow = dayjs().diff(dayjs(birthday), "year");

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`w-[2rem] h-[2rem] p-[2px] rounded-full bg-gradient-to-br ${gradient} relative`}
    >
      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
        <span
          className={`bg-gradient-to-br ${gradient} text-transparent bg-clip-text text-base font-semibold`}
        >
          {age}
        </span>
      </div>
    </div>
  );
};
