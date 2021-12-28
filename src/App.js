import Form from './componentes/form'
import Ciudad from './componentes/ciudad'
import './componentes/estilos/estilo.css'
import { useState } from 'react'

const api = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&units=metric&appid=62714afecbb76f07b34f747da00a6e42';

function App() {
  const [clima, setClima] = useState("");
  const [fondo, setFondo] = useState("");
  const [ciudad, setCiudad] = useState("");

  const mist = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"];
  const json = async (ciudad) => {
    try {
      let peticion = await fetch(`${api}${ciudad}${apiKey}`);
      let resultado = await peticion.json();
      setCiudad(resultado.name);
      console.log(resultado, resultado.name, resultado.weather[0].icon)
      setClima(resultado);
      mist.includes(resultado.weather[0].main) ? setFondo("Mist") : setFondo(resultado.weather[0].main);
    } catch {
      alert("ciudad no encontrada");
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url('${fondo === "" ? "fondo" : fondo}.jpg')` }}>
      <h1 id='titulo'>Pronóstico del tiempo</h1>
      {clima === "" ? <Form json={json} /> : <Ciudad clima={clima} ciudad={ciudad} setFondo={setFondo} setClima={setClima} />}
    </div>
  );
}

export default App;

