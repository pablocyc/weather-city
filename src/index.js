import "./components/WeatherCard.js";

const changeColor = (stage) => {
  const COLORS = {
    dawn: "hsl(319, 31%, 30%)",
    day: "hsl(197, 77%, 15%)",
    sunset: "hsl(33, 61%, 15%)",
    night: "hsl(249, 45%, 3%)",
  };
  document.documentElement.style.setProperty("--bg-color", COLORS[stage]);
};

addEventListener("DAY_MOMENT_CHANGED", ev => changeColor(ev.detail));
