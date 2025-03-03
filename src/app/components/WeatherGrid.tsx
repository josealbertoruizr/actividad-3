import { WeatherData } from "../types/weather";
import { WeatherCard } from "./WeatherCard";

interface WeatherGridProps {
  locations: WeatherData[];
}

export function WeatherGrid({ locations }: WeatherGridProps) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-10">
      {locations.map((location, index) => (
        <WeatherCard key={index} weatherData={location} />
      ))}
    </div>
  );
}