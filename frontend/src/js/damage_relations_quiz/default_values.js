import { availableTypes } from "./logic";



export const defaultAnswerObject = {
    "unSelected": {
        "N/A": availableTypes
    },
    "Immune To": {
        "x0": [],
    },
    "Resistant To": {
        "x0.5": [],
        "x0.25": []
    },
    "Normally Damaged": {
        "x1": [],
    },
    "Weak To": {
        "x2": [],
        "x4": []
    }
};

export const defaultPokemon = {
    id: null,
    name: "",
    type: [],
    damage_relations: {}
};