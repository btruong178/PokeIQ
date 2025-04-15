import { fetchSingleType, fetchSingleTypeRandom, fetchDualTypeRandom, fetchDualType, fetchRandomPokemon } from "./logic";

export const handleGetSingleType = async (selectedType) => {
    try {
        const data = await fetchSingleType(selectedType);
        console.log("Single Type Data: ", data);
    } catch (error) {
        throw new Error(error.message);
    }
};


export const handleGetDualType = async (selectedType1, selectedType2) => {
    try {
        const data = await fetchDualType(selectedType1, selectedType2);
        console.log("Dual-Type 1 Data: ", data.type1);
        console.log("Dual-Type 2 Data: ", data.type2);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handleGetSingleTypeRandom = async () => {
    const data = await fetchSingleTypeRandom();
    console.log("Single Type Data: ", data);
    return data;
};

export const handleGetDualTypeRandom = async () => {
    const data = await fetchDualTypeRandom();
    console.log("Type 1 Data: ", data.type1);
    console.log("Type 2 Data: ", data.type2);
    return data;
};

export const handleGetRandomPokemon = async () => {
    try {
        const data = await fetchRandomPokemon();
        console.log("Random Pokémon Data: ", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};