import { useEffect, useState } from "react";
import Input from './componentes/input'
import Weather from './componentes/weather';
import './estilos/estilo.css'

const API_KEY = "&appid=62714afecbb76f07b34f747da00a6e42";
const API_CLIMA = "https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&units=metric";

function App() {
  const [latlong, setLatlong] = useState([]);
  const [clima, setClima] = useState([]);

  useEffect(() => {
    latlong.length > 0 && json(latlong[0], latlong[1]);
  }, [latlong]);

  //Peticion a la api de openweathermap con la latitud y la longitud ingresada en el buscador de la aplicacion
  const json = async (latitud, longitud) => {
    let peticion = await fetch(`${API_CLIMA}&lat=${latitud}&lon=${longitud}${API_KEY}`);
    let resultado = await peticion.json();
    setClima(resultado)
  }; 

  return (
    <div className="App" style={!latlong.length>0?{minHeight:'100vh'}:{height:'100vh'}}>
      {
        !latlong.length > 0 ?
          <Input API_KEY={API_KEY} setLatlong={setLatlong} /> :
          <Weather clima={clima} latlong={latlong} setLatlong={setLatlong}/>
      }

    </div>
  );
}

export default App;
