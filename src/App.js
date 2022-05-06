import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  // Pegar localização do usuário
  const [location, setLocation] = useState(false);

  // Guardar dados da API 
  const [weather, setWeather] = useState(false);

  // Requisição da API
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric',
      }
    });
    setWeather(res.data);
  }

  // Hook para pegar as informações de geolocalização
  useEffect(() => {
    // Pegar localização do usuário (pelo browser)
    navigator.geolocation.getCurrentPosition((position) => {
      // recebe a latitude e longitude do usuário
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, []);

  // Tratamento de erro => renderização de informações
  if (location === false) {
    return (
      <>
        Você precisa habilitar a localização no browser...
      </>
    )
  } else if (weather === false) {
    return (
      <>
        Carregando o clima...
      </>
    )
  } else {
    return (
      <>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatua atual: {weather['main']['temp']}º</li>
          <li>Temperatura máxima:{weather['main']['temp_max']}º</li>
          <li>Temepratura mínima: {weather['main']['temp_min']}º</li>
          <li>Pressão: {weather['main']['pressure']}</li>
          <li>Umidade: {weather['main']['humidity']}º%</li>
        </ul>
      </>
    );
  }
}

export default App;
