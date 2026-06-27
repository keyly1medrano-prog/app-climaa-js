// Función principal que busca el clima
function buscarClima() {

let ciudad = document.getElementById("ciudad").value;

if (ciudad.trim() === "") {
mostrarError("Por favor escribe una ciudad");
return;
}

mostrarCargando();

let urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es&format=json`;

fetch(urlGeocoding)
.then(respuesta => respuesta.json())
.then(datosGeocoding => {

if (!datosGeocoding.results || datosGeocoding.results.length === 0) {
throw new Error("Ciudad no encontrada");
}

let latitud = datosGeocoding.results[0].latitude;
let longitud = datosGeocoding.results[0].longitude;
let nombreCiudad = datosGeocoding.results[0].name;

let urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

return fetch(urlClima)
.then(resp => resp.json())
.then(datosClima => {
mostrarClima(nombreCiudad, datosClima);
});
})

.catch(error => {
mostrarError(error.message);
});
}

function mostrarClima(ciudad, datos) {

let clima = datos.current;
let temperatura = Math.round(clima.temperature_2m);
let humedad = clima.relative_humidity_2m;
let viento = clima.wind_speed_10m;
let codigoClima = clima.weather_code;

let informacion = obtenerInfoClima(codigoClima);

let html = `

${ciudad}
${informacion.icono}
${temperatura}°C
${informacion.descripcion}
💧 Humedad${humedad}%
💨 Viento${viento} km/h
`;

document.getElementById("resultado").innerHTML = html;
}

function obtenerInfoClima(codigo) {

if (codigo === 0) {
return { descripcion: "Despejado", icono: "☀️" };
} else if (codigo >= 1 && codigo <= 3) {
return { descripcion: "Nublado", icono: "☁️" };
} else if (codigo >= 45 && codigo <= 48) {
return { descripcion: "Niebla", icono: "🌫️" };
} else if (codigo >= 51 && codigo <= 67) {
return { descripcion: "Lluvia", icono: "🌧️" };
} else if (codigo >= 71 && codigo <= 77) {
return { descripcion: "Nieve", icono: "❄️" };
} else if (codigo >= 80 && codigo <= 82) {
return { descripcion: "Chubascos", icono: "🌦️" };
} else if (codigo >= 95 && codigo <= 99) {
return { descripcion: "Tormenta", icono: "⛈️" };
} else {
return { descripcion: "Desconocido", icono: "🌡️" };
}
}

function mostrarError(mensaje) {
document.getElementById("resultado").innerHTML = `
❌ ${mensaje}
`;
}

function mostrarCargando() {
document.getElementById("resultado").innerHTML = `
⏳ Buscando clima...
`;
}

document.getElementById("ciudad").addEventListener("keypress", function(event) {
if (event.key === "Enter") {
buscarClima();
}
});

// Pronóstico falso de ejemplo
const dias = [
    { dia: "Lun", icono: "☀️", temp: "30°C" },
    { dia: "Mar", icono: "⛅", temp: "28°C" },
    { dia: "Mié", icono: "🌧️", temp: "25°C" },
    { dia: "Jue", icono: "🌩️", temp: "24°C" },
    { dia: "Vie", icono: "☀️", temp: "31°C" }
];

let htmlPronostico = "";

dias.forEach(d => {

    htmlPronostico += `
    
    <div class="pronostico-card">

        <h4>${d.dia}</h4>

        <div class="pronostico-icono">${d.icono}</div>

        <div class="pronostico-temp">${d.temp}</div>

    </div>
    `;
});

document.getElementById("pronostico").innerHTML = htmlPronostico;

resultado.innerHTML = `

<div class="clima-card">

    <h2>${data.name}</h2>

    <div class="icono">☁️</div>

    <div class="temperatura">
        ${Math.round(data.main.temp)}°C
    </div>

    <div class="descripcion">
        ${data.weather[0].description}
    </div>

    <div class="detalles">

        <div class="detalle">
            💧 Humedad
            <strong>${data.main.humidity}%</strong>
        </div>

        <div class="detalle">
            🍃 Viento
            <strong>${data.wind.speed} km/h</strong>
        </div>

    </div>

</div>
`;