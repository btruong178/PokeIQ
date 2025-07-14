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

export const AnswerObjectReducer = (state, action) => {
    const defaultAnswerObject = {
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

    const masterOrder = defaultAnswerObject["unSelected"]["N/A"];

    function removeTypeFromObject(object, type) {
        for (const [effectiveness, multObj] of Object.entries(object)) {
            for (const [multiplier, array] of Object.entries(multObj)) {
                if (array.includes(type)) {
                    object[effectiveness][multiplier] = array.filter(t => t !== type);
                    break;
                }
            }
        }
        return object;
    }

    switch (action.command) {
        case 'REMOVE_TYPE':
            const { type: typeToRemove } = action.payload;
            const newState = { ...state };
            removeTypeFromObject(newState, typeToRemove);
            return newState;
        case 'ADD_TYPE':
            const { type: typeToAdd, effectiveness, multiplier } = action.payload;
            const base = state[effectiveness][multiplier];
            const unSorted = base.includes(typeToAdd)
                ? base
                : [...base, typeToAdd];
            const sorted = [...unSorted].sort((a, b) => {
                const indexA = masterOrder.indexOf(a);
                const indexB = masterOrder.indexOf(b);
                return indexA - indexB;
            })
            const newEffectiveness = { ...state[effectiveness], [multiplier]: sorted };
            return { ...state, [effectiveness]: newEffectiveness };
        case 'RESET':
            return defaultAnswerObject;
        case 'SWITCH_MULTIPLIER':
            const { type: typeToSwitch, multiplier: currentMultiplier } = action.payload;
            const swapObject = {
                "x0.5": "x0.25",
                "x0.25": "x0.5",
                "x2": "x4",
                "x4": "x2"
            };
            if (Object.keys(swapObject).includes(currentMultiplier)) {
                const newState = { ...state };
                const newMultiplier = swapObject[currentMultiplier];
                removeTypeFromObject(newState, typeToSwitch);
                if (currentMultiplier === "x0.5" || currentMultiplier === "x0.25") {
                    newState["Resistant To"][newMultiplier].push(typeToSwitch);
                } else if (currentMultiplier === "x2" || currentMultiplier === "x4") {
                    newState["Weak To"][newMultiplier].push(typeToSwitch);
                }
                return newState;
            }
            return state;

        default:
            return state;
    }
}