/**
 * @file 
 * Main component that renders the Damage Relations Quiz Webpage interface. 
 * 
 * Responsibilities:
 * - Manage the states for the quiz configuration
 * - Holds all components together and manages the flow of the quiz
 * - Renders the appropriate components based on the quiz state (Form vs Quiz)
 * 
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
    defaultAnswerObject
} from "../Logic-Handling/Default-Values.js";
import { AnswerObjectReducer } from "../Logic-Handling/Reducer-Functions.js";
import { Header } from "./Header.js";
import { TypeEffectivenessZones } from "../React-dnd/Dropzone-Components.js";
import ErrorModal from '../../Utilities/Error-Modal.js';
import { capitalizeFirstLetter } from "../../Utilities/string.js";
import '../../../css/Damage-Relations-Quiz/Components/Quiz.css';


/**
 * @component
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
    const [AnswerObject, dispatchAnswerObject] = useReducer(AnswerObjectReducer, defaultAnswerObject);
    // Reducer for managing incorrect answers
    const [incorrectAnswers, dispatchIncorrectAnswers] = useReducer(AnswerObjectReducer, defaultAnswerObject);



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
                    setSelectedSingleType(capitalizeFirstLetter(data.name));
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
                    <Header
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