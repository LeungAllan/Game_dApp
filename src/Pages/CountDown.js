import { useEffect, useState } from "react";

const Test = () => {
  const targetDate = "12/25/2021 15:49:00";

  const calculateTimeLeft = () => {
    //let year = new Date().getFullYear();
    let difference = +new Date(targetDate) - +new Date().getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      <h1>Year {year} Countdown</h1>
      <h2>With React Hooks!</h2>
      <p>Target Date : {targetDate}</p>
      <p>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </p>
    </div>
  );
};

export default Test;
