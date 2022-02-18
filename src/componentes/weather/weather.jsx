import { useState } from "react";

const Weather = ({ clima, latlong, setLatlong }) => {

    const [clases, setClases] = useState("");

    //funcion devuelve hora
    const hora_retorno = (utc) => {
        let hora_actual = new Date(utc * 1000).getHours();
        let minutos_actuales = new Date(utc * 1000).getMinutes();
        if (minutos_actuales > 9) {
            return `${hora_actual}:${minutos_actuales}`
        } else {
            return `${hora_actual}:0${minutos_actuales}`
        }
    }

    //funcion devolver dia de la semana
    const diaEnLetras = (fecha) => {
        const dias = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
        ];
        return dias[new Date(fecha * 1000).getDay()];
    }

    if (clima.current !== undefined) {
        const {
            dt: hora,
            feels_like: termica,
            humidity: humedad,
            sunrise: amanecer,
            sunset: atardecer,
            temp: temperatura,
            uv: uv,
            pressure: presion,
            wind_speed: viento,
            weather: imagen
        } = clima.current;

        console.log(imagen)

        const fragmento = () => {
            return (
                <div className={`detalles ${!clases ? "visible" : ""}`}>
                    <p>Sensacion Termica: {parseInt(termica)}º</p>
                    <p>Humedad: {humedad}%</p>
                    <p>Presion atmosferica: {presion} hPa</p>
                    <p>Velocidad del viento: {viento} KM</p>
                    <p>Amanecer: {hora_retorno(amanecer)} hrs.</p>
                    <p>Atardecer: {hora_retorno(atardecer)} hrs.</p>
                </div>
            )
        }
        return (
            <div id="weather" style={{ backgroundImage: `url(imagenes/${imagen[0].icon}.jpg)` }}>
                <div className="arriba">
                    <div className="hoy">
                        <div>
                            <h3>{latlong[2]}</h3>
                            <p className="ahora">HOY, {hora_retorno(hora)} hrs.</p>
                            <div className="div-img">
                                <img src={`http://openweathermap.org/img/wn/${imagen[0].icon}.png`} />
                            </div>
                        </div>
                        <div className="grados">
                            <h2>{parseInt(temperatura)}º</h2>
                            <p><span className="maxima">{parseInt(clima.daily[0].temp.max)}º</span>/<span className="minima">{parseInt(clima.daily[0].temp.min)}º</span></p>
                        </div>
                    </div>
                    {fragmento()}
                </div>
                <div className="abajo">
                    <p className="lista"><span className={`ahora ${!clases ? "activo" : ""}`} onClick={() => setClases("")}>Ahora</span><span className={clases === "activo" ? "activo" : ""} onClick={() => setClases("activo")} >1 - 7 Días</span></p>
                    <div className={`cuadros-div ${clases ? "visible" : ""}`}>
                        {
                            clima.daily.slice(1, 8).map((dia, indice) =>
                                <div key={indice} className="cuadros">
                                    <p className="dia">{diaEnLetras(dia.dt)}</p>
                                    <img src={`http://openweathermap.org/img/wn/${dia.weather[0].icon}.png`} />
                                    <p>{parseInt(dia.temp.day)}º</p>
                                    <p><span className="maxima">{parseInt(dia.temp.max)}º</span>/<span className="minima">{parseInt(dia.temp.min)}º</span></p>
                                </div>
                            )
                        }
                    </div>
                    {fragmento()}
                </div>
                <button className="atras" onClick={() => setLatlong([])}>ATRAS</button>
            </div>
        )
    } else {
        return (
            <div class="lds-dual-ring img-carga">
            </div>
        )
    }
}

export default Weather;