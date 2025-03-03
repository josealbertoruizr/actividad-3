"use client";
import React from "react";
import { WeatherData } from "../types/weather";

interface WeatherCardProps {
  weatherData: WeatherData;
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-xl font-bold">{weatherData.location.name}</h2>
      <p className="text-sm text-gray-400">{weatherData.location.country}</p>
      <div className="flex items-center mt-2">
        <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} className="w-16 h-16" />
        <span className="text-2xl ml-2">{weatherData.current.temp_c}°C</span>
      </div>
      <p className="mt-1">{weatherData.current.condition.text}</p>
      <div className="mt-2 text-sm text-gray-300">
        <p>Humedad: {weatherData.current.humidity}%</p>
        <p>Viento: {weatherData.current.wind_kph} km/h</p>
      </div>
    </div>
  );
}