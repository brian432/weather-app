import { useState } from "react";

const Form = ({json}) => {
    const [search, setSearch] = useState("");

    /*Manejo de formulario*/
    const handleOnChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        json(search)
    }
    return (
        <form id="div-formulario" onSubmit={handleSubmit}>
            <input type="search" placeholder="buscar por ubicación" value={search} onChange={handleOnChange} />
            <button type="submit">Buscar</button>
        </form>
    )
}

export default Form;