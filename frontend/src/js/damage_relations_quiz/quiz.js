/**
 * @file 
 * Main component that renders the Damage Relations Quiz Webpage interface. 
 * It manages the state for selecting Pokémon types, handles form submissions to fetch Pokémon data based on
 * different type modes, and displays either the form or selection JSX components based on the quiz state.
 * @module DamageRelations_Quiz
 * @component
 */

import { useReducer, useState } from "react";
import DamageRelationsForm from "./form";
import {
    handleGetSingleType,
    handleGetSingleTypeRandom,
    handleGetDualType,
    handleGetDualTypeRandom,
    handleGetRandomPokemon
} from "./handlers";
import {
    defaultPokemon,
    defaultAnswerObject,
    AnswerObjectReducer
} from "./reducer_functions"
import { Header } from "./header";
import { TypeEffectivenessZones } from "./dropzone_components";
import { Container } from "react-bootstrap";
import CustomModal from '../utilities/custom_modal';
import '../../css/damage_relations_quiz/quiz.css';


/**
 * @returns {JSX.Element} The main component for the Damage Relations Quiz.
 */

function Damage_Relations_Quiz() {
    // Default states for quiz configuration and data management




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



    /**
     * Handles change for the 'single type' input.
     *
     * @param {Event} e - The event object from the input field.
     */
    const handleTypeChange = e => setSelectedSingleType(e.target.value);

    /**
     * Handles change for the 'first dual type' input.
     *
     * @param {Event} e - The event object from the input field.
     */
    const handleTypeChange1 = e => setSelectedDualType1(e.target.value);

    /**
     * Handles change for the 'second dual type' input.
     *
     * @param {Event} e - The event object from the input field.
     */
    const handleTypeChange2 = e => setSelectedDualType2(e.target.value);

    /**
     * Displays the error modal with a specified message.
     *
     * @param {string} msg - The error message to be displayed.
     */
    const showErrorModal = (msg) => {
        setModalMessage(msg);
        setShowModal(true);
    };

    /**
     * Closes the error modal.
     */
    const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
    };


    /**
     * Handles form submission by fetching Pokémon data based on selected mode.
     *
     * Depending on the TypeMode and the random flag, this function triggers different
     * handlers to fetch either a single Pokémon type, dual types, or Pokémon data.
     *
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if a non-random choice is made in "Pokemon" mode.
     */
    const handleSubmit = async () => {
        try {
            if (TypeMode === "Single") {
                if (random) {
                    const data = await handleGetSingleTypeRandom();
                    setSelectedSingleType(data.name);
                } else {
                    await handleGetSingleType(selectedSingleType);
                }
            } else if (TypeMode === "Dual") {
                if (random) {
                    const data = await handleGetDualTypeRandom();
                    setSelectedDualType1(data.type1.name);
                    setSelectedDualType2(data.type2.name);
                } else {
                    await handleGetDualType(selectedDualType1, selectedDualType2);
                }
            } else if (TypeMode === "Pokemon") {
                if (random) {
                    const data = await handleGetRandomPokemon();
                    setPokemon(data);
                } else {
                    throw new Error("Random Pokemon Type is only available when 'Random' is selected.");
                }
            }
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
                    onSubmit={handleSubmit}
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
                        onSubmit={handleSubmit}
                        AnswerObject={AnswerObject}
                        dispatchAnswerObject={dispatchAnswerObject}
                    />
                    <div className="type-effectiveness-zones-container">
                        <TypeEffectivenessZones AnswerObject={AnswerObject} dispatchAnswerObject={dispatchAnswerObject} />
                    </div>

                </>
            )}

            {showModal && (
                <CustomModal message={modalMessage} onClose={closeModal} />
            )}
        </div>
    );
}

export default Damage_Relations_Quiz;