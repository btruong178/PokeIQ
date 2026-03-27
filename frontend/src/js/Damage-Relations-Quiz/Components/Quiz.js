/**
 * @file 
 * Module for the Damage Relations Quiz component, which serves as the main entry point for the quiz interface. <br>
 * Quiz manages the overall state and flow of the quiz as it compiles all other components together.
 * @module DamageRelations-Quiz
 */

import { useReducer, useState } from "react";
import DamageRelationsForm from "./Form.js";
import {
    logHandleGetSingleType,
    logHandleGetDualType,
    getSingleTypeDataRandom,
    getDualTypeDataRandom,
    getRandomPokemonData
} from "../Logic-Handling/Handlers.js";
import {
    defaultPokemon,
    defaultResponseState
} from "../Logic-Handling/Default-Values.js";
import { userResponseReducer } from "../Logic-Handling/Reducers.js";
import DamageRelationsHeader from "./Header.js";
import TypeEffectivenessZones from "js/Damage-Relations-Quiz/React-dnd/Type-Effectiveness-Zones.js";
import ErrorModal from 'js/utilities/Error-Modal.js';
import { capitalizeFirstLetter } from "js/utilities/Utilities-Strings.js";
import 'css/Damage-Relations-Quiz/Components/Quiz.css';


/**
 * @memberof module:DamageRelations-Quiz
 * @description
 * Main component and entry point for the Damage Relations Quiz webpage. Manages the overall state and flow of the quiz.
 * Renders the form for quiz configuration and the quiz interface based on the current state.
 * @returns {JSX.Element} The main component for the Damage Relations Quiz webpage
 */

function DamageRelationsQuiz() {
    // State hooks for quiz configuration and data management
    const [selectedSingleType, setSelectedSingleType] = useState("");
    const [selectedDualType1, setSelectedDualType1] = useState("");
    const [selectedDualType2, setSelectedDualType2] = useState("");
    const [pokemon, setPokemon] = useState(defaultPokemon);
    const [random, setRandom] = useState(true);
    const [TypeMode, setTypeMode] = useState("Single");
    // State for managing modal messages and visibility
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [quiz, setQuiz] = useState(false);
    // Reducer for managing the answer object state
    const [AnswerObject, dispatchAnswerObject] = useReducer(userResponseReducer, defaultResponseState);
    // Reducer for managing incorrect answers
    const [incorrectAnswers, dispatchIncorrectAnswers] = useReducer(userResponseReducer, defaultResponseState);



    const handleTypeChange = e => setSelectedSingleType(e.target.value);
    const handleTypeChange1 = e => setSelectedDualType1(e.target.value);
    const handleTypeChange2 = e => setSelectedDualType2(e.target.value);
    const showErrorModal = (msg) => {
        setModalMessage(msg);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
    };
    const formHandleSubmit = async () => {
        const actions = {
            Single: random
                ? async () => {
                    const data = await getSingleTypeDataRandom();
                    setSelectedSingleType(capitalizeFirstLetter(data.type1.name));
                }
                : async () => {
                    await logHandleGetSingleType(selectedSingleType);
                },

            Dual: random
                ? async () => {
                    const data = await getDualTypeDataRandom();
                    setSelectedDualType1(capitalizeFirstLetter(data.type1.name));
                    setSelectedDualType2(capitalizeFirstLetter(data.type2.name));
                }
                : async () => {
                    await logHandleGetDualType(selectedDualType1, selectedDualType2);
                },

            Pokemon: async () => {
                if (!random) throw new Error("Random Pokémon only when ‘Random’ is selected.");
                const data = await getRandomPokemonData();
                setPokemon(data);
            }
        };
        try {
            await actions[TypeMode]();
            setQuiz(true);
        } catch (error) {
            showErrorModal(error.message);
        }
    };

    return (
        <div className="damage-relations-container">
            {!quiz ? (
                <DamageRelationsForm
                    random={random}
                    TypeMode={TypeMode}
                    selectedSingleType={selectedSingleType}
                    selectedDualType1={selectedDualType1}
                    selectedDualType2={selectedDualType2}
                    setRandom={setRandom}
                    setTypeMode={setTypeMode}
                    handleTypeChange={handleTypeChange}
                    handleTypeChange1={handleTypeChange1}
                    handleTypeChange2={handleTypeChange2}
                    formHandleSubmit={formHandleSubmit}
                />
            ) : (
                <>
                    <DamageRelationsHeader
                        selectedSingleType={selectedSingleType}
                        selectedDualType1={selectedDualType1}
                        selectedDualType2={selectedDualType2}
                        random={random}
                        TypeMode={TypeMode}
                        pokemon={pokemon}
                        setQuiz={setQuiz}
                        formHandleSubmit={formHandleSubmit}
                        AnswerObject={AnswerObject}
                        dispatchAnswerObject={dispatchAnswerObject}
                    />
                    <div className="type-effectiveness-zones-container">
                        <TypeEffectivenessZones
                            AnswerObject={AnswerObject}
                            dispatchAnswerObject={dispatchAnswerObject}
                            pokemon={pokemon}
                            TypeMode={TypeMode}
                        />
                    </div>
                </>
            )}

            {showModal && (
                <ErrorModal message={modalMessage} onClose={closeModal} />
            )}
        </div>
    );
}

export default DamageRelationsQuiz;