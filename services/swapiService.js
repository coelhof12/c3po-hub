/* This file manages API calls to the Star Wars API.  */

const BASE_URL = 'https://swapi.dev/api';

// Function to fetch the characters affiliation data dynamically
const fetchAffiliationData = async () => {
    try {
        const response = await fetch('./charactersAffiliation.json');
        if (!response.ok) {
            throw new Error('Failed to load affiliation data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching affiliation data:", error);
        return [];
    }
};

const fetchAllCharactersParallel = async () => {
    const url = `${BASE_URL}/people/`;
    let allCharacters = [];

    try {
        // Fetch 1st page + get total number of pages
        const firstResponse = await fetch(url);
        const firstData = await firstResponse.json();
        const totalChars = firstData.count; // Total number of characters
        const charsPerPage = firstData.results.length; // Number of characters per page
        const totalPages = Math.ceil(totalChars / charsPerPage);

        // Create an array of fetch promises for pages 2 to totalPages
        const fetchPromises = [];
        for (let i = 2; i <= totalPages; i++) {
            fetchPromises.push(fetch(`${url}?page=${i}`).then(resp => resp.json()));
        }

        // Fetch all pages in parallel
        const results = await Promise.all(fetchPromises);

        // Combine all results
        allCharacters = [...firstData.results]; // Start with the first page data
        results.forEach(pageData => {
            allCharacters.push(...pageData.results); // Add results from next pages
        });

        return allCharacters;

    } catch (error) {
        console.error("Error fetching characters:", error);
        return [];
    }
};

const getAttribute = async (name, attribute) => {
    try {
        // Fetch characters once
        const characters = await fetchAllCharactersParallel();

        // Check if the attribute exists in any character
        const attributeExists = characters.some(character => Object.keys(character).includes(attribute));
        if (!attributeExists) {
            return `Attribute ${attribute} does not exist in any character.`;
        }

        // Find the character by name
        const character = characters.find(character => character.name === name);
        if (character) {
            // Return the attribute value or a message if the attribute does not exist for this character
            return character[attribute] || `Attribute ${attribute} not found for character ${name}`;
        } else {
            return `Character ${name} not found.`;
        }
    } catch (error) {
        console.error("Error getting attribute:", error);
        return `Error retrieving attribute: ${error.message}`;
    }
};

/* Display a list of characters */
const displayCharacters = async () => {
    const characters = await fetchAllCharactersParallel();
    console.log(characters);
};

/* Display characters by affiliation side */
const displayCharacterBySide = async (side) => {
    try {
        const characters = await fetchAllCharactersParallel();
        const affiliationData = await fetchAffiliationData(); // Fetch affiliation data dynamically
        const affiliationCharacters = affiliationData
            .filter(character => character.side === side)
            .map(character => character.name);

        const filteredCharacters = characters.filter(character =>
            affiliationCharacters.includes(character.name));

        console.log(filteredCharacters);

    } catch (error) {
        console.error("Error displaying characters by side:", error);
    }
};

const fetchCharacterByName = async (name) => {
    const characters = await fetchAllCharactersParallel();
    return characters.find(character => character.name === name);
};

const displayCharAttributes = async (attribute, name) => {
    const result = await getAttribute(name, attribute);
    console.log(result);
};

const displayCharFilms = async (name) => {
    displayCharAttributes('films', name);
};

const displayCharPlanets = async (name) => {
    displayCharAttributes('homeworld', name);
};

const displayStarships = async (name) => {
    displayCharAttributes('starships', name);
};

const displayCharSpecies = async (name) => {
    displayCharAttributes('species', name);
};

const displayCharVehicles = async (name) => {
    displayCharAttributes('vehicles', name);
};

// Exporting the functions to be used in other parts of the application
export {
    displayCharacters,
    displayCharacterBySide,
    fetchCharacterByName,
    displayCharFilms,
    displayStarships,
    displayCharSpecies,
    displayCharVehicles
};
