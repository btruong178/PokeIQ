import { fetchSingleType, fetchSingleTypeRandom, fetchDualTypeRandom, fetchDualType } from "./logic";

export const handleGetSingleType = async (selectedType, onError) => {
    if (!selectedType) {
        const msg = "No type selected";
        console.warn(msg);
        throw new Error(msg);
    }
    const data = await fetchSingleType(selectedType);
    console.log("Single Type Data: ", data);
};

export const validateDualType = (type1, type2) => {
    if (type1 === type2) {
        throw new Error("Cannot have the same type twice.");
    }
    if (type1 === "" || type2 === "") {
        throw new Error("Missing type(s)");
    }
    if (!type1 || !type2) {
        throw new Error("Invalid type selected");
    }
    return true;
};

export const handleGetDualType = async (selectedType1, selectedType2, onError) => {
    try {
        validateDualType(selectedType1, selectedType2);
        const data = await fetchDualType(selectedType1, selectedType2);
        console.log("Dual-Type 1 Data: ", data.type1);
        console.log("Dual-Type 2 Data: ", data.type2);
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
};

export const handleGetSingleTypeRandom = async () => {
    const data = await fetchSingleTypeRandom();
    console.log("Single Type Data: ", data);
};

export const handleGetDualTypeRandom = async () => {
    const data = await fetchDualTypeRandom();
    console.log("Type 1 Data: ", data.type1);
    console.log("Type 2 Data: ", data.type2);
};