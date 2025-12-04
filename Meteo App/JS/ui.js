// Récupération des éléments DOM dans les fonctions pour éviter les erreurs de timing
function getStatusEl() {
    const el = document.getElementById('status');
    if (!el) throw new Error('Élément status non trouvé');
    return el;
  }
  
  function getCurrentEl() {
    const el = document.getElementById('current');
    if (!el) throw new Error('Élément current non trouvé');
    return el;
  }
  
  function getForecastEl() {
    const el = document.getElementById('forecast');
    if (!el) throw new Error('Élément forecast non trouvé');
    return el;
  }
  
  export function showStatus(message, type = 'info'){
    const statusEl = getStatusEl();
    statusEl.classList.remove('hidden');
    statusEl.textContent = message;
  }
  
  export function hideStatus(){
    const statusEl = getStatusEl();
    statusEl.classList.add('hidden');
  }
  
  export function renderCurrent(city, country, current){
    const currentEl = getCurrentEl();
    currentEl.innerHTML = `
      <div class="city">${city}, ${country}</div>
      <div class="temp">${Math.round(current.temperature)}°C</div>
      <div class="meta">Vent: ${Math.round(current.windspeed)} km/h · Dir: ${current.winddirection}°</div>
    `;
    currentEl.classList.remove('hidden');
  }
  
  export function renderForecast(daily, iconMapper){
    const forecastEl = getForecastEl();
    const days = daily.time.map((date, i) => ({
      date,
      tmax: daily.temperature_2m_max[i],
      tmin: daily.temperature_2m_min[i],
      code: daily.weathercode[i]
    }));
  
    forecastEl.innerHTML = days.map(d => `
      <div class="card">
        <div class="day">${formatDay(d.date)}</div>
        <div class="icon">${iconMapper(d.code)}</div>
        <div class="t">${Math.round(d.tmax)}° / ${Math.round(d.tmin)}°</div>
      </div>
    `).join('');
    forecastEl.classList.remove('hidden');
  }
  
  function formatDay(isoDate){
    const d = new Date(isoDate);
    return d.toLocaleDateString('fr-FR', { weekday:'short', day:'2-digit', month:'short' });
  }
  