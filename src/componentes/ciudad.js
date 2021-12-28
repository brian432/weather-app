import { useEffect, useState } from "react";

const Ciudad = ({ clima, setFondo, setClima, ciudad}) => {

    const diasDeSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    const img = "http://openweathermap.org/img/wn/";

    return (
        <div id="div-container">
            {clima.length === 0 ?
                <div className="loader"></div> :
                <div>
                    <button id="atras" onClick={() => { setClima(""); setFondo("") }}>Atras</button>
                    <h2>{ciudad}</h2>
                    <div id="display">
                        <div className="hoy">
                            <h3>HOY</h3>
                            <div className="div-img">
                                <img src={`${img}${clima.weather[0].icon}.png`}></img>
                            </div>
                            <p id="temp">{parseInt(clima.main.temp)}</p>
                            <div className="minmaxTemp">
                                <p><span style={{ "color": "red" }}>{parseInt(clima.main.temp_max)}º</span>/</p>
                                <p><span style={{ "color": "blue" }}>{parseInt(clima.main.temp_min)}º</span></p>
                            </div>
                            <p id="humedad">Humedad {clima.main.humidity}%</p>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default Ciudad;