import { geocodeCity, fetchWeather, mapWeatherCodeToIcon } from './api.js';
import { showStatus, hideStatus, renderCurrent, renderForecast } from './ui.js';

const form = document.getElementById('searchForm');
const input = document.getElementById('cityInput');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  try {
    showStatus('🔎 Recherche de la ville...');
    const geo = await geocodeCity(city);

    showStatus('☁️ Récupération de la météo...');
    const weather = await fetchWeather({ latitude: geo.latitude, longitude: geo.longitude });

    hideStatus();
    renderCurrent(geo.name, geo.country_code, weather.current_weather);
    renderForecast(weather.daily, mapWeatherCodeToIcon);
  } catch (err) {
    console.error(err);
    showStatus(`❌ ${err.message || 'Erreur inconnue'}`);
  }
});
