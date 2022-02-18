import { useEffect, useState } from "react";

const API_GEO = "https://api.openweathermap.org/geo/1.0/direct?limit=0&lang=sp&q=";
const Input = ({ API_KEY, setLatlong }) => {
    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [pais, setPais] = useState("");
    const [ciudad, setCiudad] = useState("");


    //Cada vez que en el formulario, el estado 'ciudad' cambie, se hara la peticion a la api.
    useEffect(() => {
        ciudad && json(ciudad)
    }, [ciudad])

    //Peticion a la api
    const json = async (ciudad) => {
        let peticion = await fetch(`${API_GEO}${ciudad} ${API_KEY}`);
        let resultado = await peticion.json();
        setPaises(resultado)
    };

    //Funcion que retorna los options de del formulario sin repetir.
    const paisesSinDuplicado = () => {
        let retornoPaises = [];
        paises.length > 0 && ciudad && paises.map(elemento => !retornoPaises.includes(elemento.country) && retornoPaises.push(elemento.country));
        return retornoPaises;
    }

    //Funcion que maneja el onsubmit del formulario
    const handleSearch = (e) => {
        e.preventDefault();
        setCiudades(paises.filter(elemento => elemento.country === pais && elemento));
        setCiudad("");
    }


    return (
        <main id="inicio">
            <form onSubmit={handleSearch}>
                <h1>Ingresa la Ciudad y su país</h1>
                <input type="search" onChange={(e) => setCiudad(e.target.value)} value={ciudad} />
                <select id="select" onChange={(e) => setPais(e.target.value)} value={pais}>
                    <option hidden>Elige un país</option>
                    {
                        paisesSinDuplicado().map((pais, indice) =>
                            <option key={indice} >{pais}</option>
                        )
                    }
                </select>
                <button type="submit">Buscar</button>
            </form>
            <div className="ciudades">
                {
                    ciudades.length > 0 && ciudades.map((elemento, indice) =>
                        <div key={indice} onClick={() => setLatlong([elemento.lat, elemento.lon, elemento.name])}> {/*enviamos a otro componente la longitud y la latitud de la ciudad*/}
                            <p>Ciudad: {elemento.local_names ? elemento.local_names.es ? elemento.local_names.es : elemento.name : elemento.name}</p>
                            <p>Estado/Provincia: {elemento.state}</p>
                        </div>
                    )
                }
            </div>
        </main>
    )
}

export default Input;