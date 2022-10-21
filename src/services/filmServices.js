const fetch = require('node-fetch-commonjs');

const esKeys = {
    title: "titulo",
    episode_id: "episodio_id",
    opening_crawl: "apertura",
    director: "director",
    producer: "productor",
    release_date: "fecha_lanzamiento",
    characters: "personajes",
    planets: "planetas",
    starships: "naves_estelares",
    vehicles: "vehiculos",
    species: "especies",
    created: "creado",
    edited: "editado"
}

const findFilm = async(id) => {
    const response = await customFetch(`films/${id}`);
    const esFormat = renameKeys(response, esKeys);
    return esFormat;
}

const findFilms = async() => {
    const response = await customFetch('films');
    const esFormat = await response.results.map(x => renameKeys(x, esKeys))
    return esFormat;
}

const customFetch = async(endpoint) => {
    const result = await fetch( `https://swapi.py4e.com/api/${endpoint}`);
    const response = await result.json();
    return response; 
}

const renameKeys = (obj, newKeys) => {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    }) 
    return Object.assign({}, ...keyValues)
}

module.exports = {
    findFilm,
    findFilms
}