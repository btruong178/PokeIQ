import { useState, useEffect } from "react";
import axios from "axios";
import '../../css/damage_relations_quiz.css';


const Damage_Relations_API_URL = 'http://localhost:5000/pokemon/damage_relations'; // '/:typeName' at the end

const availableTypes = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy'
];

const RandomTypeSingle = () => {
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    return availableTypes[randomIndex];
}

const RandomTypeDual = () => {
    const randomIndex1 = Math.floor(Math.random() * availableTypes.length);
    let randomIndex2 = randomIndex1;
    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * availableTypes.length);
    }
    return [availableTypes[randomIndex1], availableTypes[randomIndex2]];
}


const validateSingleType = (type) => {
    if (typeof type !== 'string') {
        throw new Error("Invalid: Type name must be a string.\nCurrent type: " + type);
    }
    if (!availableTypes.includes(type = type.toLowerCase())) {
        throw new Error("Invalid: Type not found.");
    }
}

const validateDualType = (type1, type2) => {
    validateSingleType(type1);
    validateSingleType(type2);
    if (type1 === type2) {
        throw new Error("Type names must be different.");
    }
};


const fetchSingleType = async (type) => {
    try {
        const response = await axios.get(`${Damage_Relations_API_URL}/${type}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

const fetchDualType = async (type1, type2) => {
    try {
        validateDualType(type1, type2);
        const type1Data = await fetchSingleType(type1);
        const type2Data = await fetchSingleType(type2);
        return { type1: type1Data, type2: type2Data };
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

const fetchSingleTypeRandom = async () => {
    try {
        const RandomType = RandomTypeSingle();
        const data = fetchSingleType(RandomType)
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

const fetchDualTypeRandom = async () => {
    try {
        const [RandomType1, RandomType2] = RandomTypeDual();
        const data = fetchDualType(RandomType1, RandomType2)
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export { fetchDualType, fetchSingleType, fetchSingleTypeRandom, fetchDualTypeRandom, availableTypes };


