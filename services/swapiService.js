/* This file manages API calls to the Star Wars API. */
import affiliationData from './charactersAffiliation.json';

const affiliationMapping = affiliationData;

const BASE_URL = 'https://swapi.dev/api';

/* Display a list of characters */
const displayCharacters = async () => {
    let characters = [];
    let url = '${BASE_URL}/people/';

    // do the fetch and returns a promise object
    // the await stalls the program, stopping it from assigning any 
    // value to the variable (response) until the promise is resolved
    // when the promise is resolved, we can take the value from that 
    // resolved funtion and assign it to the variable

    const response = await fetch(url); // returns a promise assigned to 'response'

    if(!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const data = await response.json();
    characters = data.results;
    return characters;
};

const displayCharacterBySide = async(side) => {
    const characters = await displayCharacters;

    return characters.filter(character => {
        const affiliation = affiliationMapping;
    })
};

const displayCharacterById = async(id) =>{};

const displayCharacterByName = async(name) => {};

const displayStarWarsfilms = async() => {};

const displayStarships = async() => {};

const displaySpecies = async() => {};

const displayVehicles = async() => {};