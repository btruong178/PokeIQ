import axios from "axios";


const Damage_Relations_API_URL = 'http://localhost:5000/pokemon/damage_relations'; // '/:typeName' at the end

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const availableTypes = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy'
].map(type => capitalizeFirstLetter(type));

export const RandomTypeSingle = () => {
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    return availableTypes[randomIndex];
}

export const RandomTypeDual = () => {
    const randomIndex1 = Math.floor(Math.random() * availableTypes.length);
    let randomIndex2 = randomIndex1;
    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * availableTypes.length);
    }
    return [availableTypes[randomIndex1], availableTypes[randomIndex2]];
}


const validateSingleType = (type) => {
    if (type === "") {
        throw new Error("No Type Selected");
    }
}

const validateDualType = (type1, type2) => {
    if (type1 === "" || type2 === "") {
        throw new Error("Missing type(s)");
    }
    if (type1 === type2) {
        throw new Error("Cannot have the same type twice.");
    }
};


export const fetchSingleType = async (type) => {
    try {
        validateSingleType(type);
        const response = await axios.get(`${Damage_Relations_API_URL}/${type}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export const fetchDualType = async (type1, type2) => {
    try {
        validateDualType(type1, type2);
        const type1Data = await fetchSingleType(type1);
        const type2Data = await fetchSingleType(type2);
        return { type1: type1Data, type2: type2Data };
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export const fetchSingleTypeRandom = async () => {
    try {
        const RandomType = RandomTypeSingle();
        const data = fetchSingleType(RandomType)
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const fetchDualTypeRandom = async () => {
    try {
        const [RandomType1, RandomType2] = RandomTypeDual();
        const data = fetchDualType(RandomType1, RandomType2)
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};


