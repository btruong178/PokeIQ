import React, { useState } from "react";
import DamageRelationsForm from "./form";
import {
    handleGetSingleType,
    handleGetSingleTypeRandom,
    handleGetDualType,
    handleGetDualTypeRandom
} from "./handlers";
import { Selection } from "./selection";
import '../../css/damage_relations_quiz/quiz.css';
import CustomModal from '../utilities/custom_modal';

function Damage_Relations_Quiz() {
    const [selectedSingleType, setSelectedSingleType] = useState("");
    const [selectedDualType1, setSelectedDualType1] = useState("");
    const [selectedDualType2, setSelectedDualType2] = useState("");
    const [random, setRandom] = useState(true);
    const [TypeMode, setTypeMode] = useState("Single");
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [quiz, setQuiz] = useState(false);

    const handleTypeChange = e => setSelectedSingleType(e.target.value);
    const handleTypeChange1 = e => setSelectedDualType1(e.target.value);
    const handleTypeChange2 = e => setSelectedDualType2(e.target.value);

    const showErrorModal = msg => {
        setModalMessage(msg);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
    };

    const handleSubmit = async () => {
        try {
            if (TypeMode === "Single") {
                random
                    ? await handleGetSingleTypeRandom()
                    : await handleGetSingleType(selectedSingleType);
            } else if (TypeMode === "Dual") {
                random
                    ? await handleGetDualTypeRandom()
                    : await handleGetDualType(selectedDualType1, selectedDualType2);
            }
            setQuiz(true);
        } catch (error) {
            showErrorModal(error.message);
        }
    };

    return (
        <div className="damage-relations-container">
            <h1>Damage Relations</h1>
            <p>
                Welcome to the Damage Relations page! Here you can explore the damage
                relations between different Pokémon types.
            </p>
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
                <Selection
                    selectedSingleType={selectedSingleType}
                    selectedDualType1={selectedDualType1}
                    selectedDualType2={selectedDualType2}
                    TypeMode={TypeMode}
                    quiz={quiz}
                    setQuiz={setQuiz}
                />
            )}
            {showModal && (
                <CustomModal message={modalMessage} onClose={closeModal} />
            )}
        </div>
    );
}

export default Damage_Relations_Quiz;