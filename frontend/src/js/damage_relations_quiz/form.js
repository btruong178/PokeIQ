/**
 * @file
 * Form component for the Damage Relations Quiz.
 * It provides options for selecting Pokémon types and modes, and handles the submission of the form.
 * @module DamageRelations_Form
 * @component
 */

import React, { useEffect } from "react";
import { availableTypes } from "./logic";
import "../../css/damage_relations_quiz/form.css";

/**
 * DamageRelationsForm renders the quiz form.
 *
 * @param {Object} props - The component properties.
 * @param {boolean} props.random - Indicates if the quiz is in random mode.
 * @param {string} props.TypeMode - The current type mode ("Single", "Dual", or "Pokemon").
 * @param {string} props.selectedSingleType - The currently selected single Pokémon type.
 * @param {string} props.selectedDualType1 - The currently selected first dual Pokémon type.
 * @param {string} props.selectedDualType2 - The currently selected second dual Pokémon type.
 * *@param {Function} props.setRandom - Function to update the random flag.
 * *@param {Function} props.setTypeMode - Function to update the type mode.
 * *@param {Function} props.handleTypeChange - Handler for single type input changes.
 * *@param {Function} props.handleTypeChange1 - Handler for first dual type input changes.
 * *@param {Function} props.handleTypeChange2 - Handler for second dual type input changes.
 * *@param {Function} props.onSubmit - Callback function to handle form submission.
 * @returns {JSX.Element} The DamageRelationsForm component.
 */
const DamageRelationsForm = ({
    random,
    TypeMode,
    selectedSingleType,
    selectedDualType1,
    selectedDualType2,
    setRandom,
    setTypeMode,
    handleTypeChange,
    handleTypeChange1,
    handleTypeChange2,
    onSubmit,
}) => {
    useEffect(() => {
        if (random) {
            handleTypeChange({ target: { value: "" } });
            handleTypeChange1({ target: { value: "" } });
            handleTypeChange2({ target: { value: "" } });
        }
        if (!random && TypeMode === "Pokemon") {
            setTypeMode("Single");
            handleTypeChange({ target: { value: "" } });
        }
    }, [random]);

    return (
        <div className="form-container">
            <h1>Damage Relations</h1>
            <p>
                Welcome to the Damage Relations page! Here you can quiz yourself
                on damage relations of each type! Select your mode(s) and type(s) to
                get started.
            </p>
            <div className="toggles-options">
                <div className="random-toggle">
                    <label htmlFor="random">Random Mode:</label>
                    <input
                        type="checkbox"
                        id="random"
                        checked={random}
                        onChange={() => setRandom(!random)}
                    />
                </div>

                <div className="type-mode-toggle">
                    <label htmlFor="type-mode">Select Type Mode:</label>
                    <select
                        id="type-mode"
                        value={TypeMode}
                        onChange={(e) => setTypeMode(e.target.value)}
                    >
                        <option value="Single">Single</option>
                        <option value="Dual">Dual</option>
                        {random && <option value="Pokemon">Pokemon</option>}
                    </select>
                </div>

                {!random && TypeMode === "Single" && (
                    <div className="single-type-select">
                        <label htmlFor="type-select">Choose a type: </label>
                        <select
                            id="type-select"
                            value={selectedSingleType}
                            onChange={handleTypeChange}
                        >
                            <option value="">--Select a Type--</option>
                            {availableTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {!random && TypeMode === "Dual" && (
                    <div className="dual-type-select">
                        <label htmlFor="dual-type-select-1">Choose Type 1: </label>
                        <select
                            id="dual-type-select-1"
                            value={selectedDualType1}
                            onChange={handleTypeChange1}
                        >
                            <option value="">--Select a Type--</option>
                            {availableTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="dual-type-select-2">Choose Type 2: </label>
                        <select
                            id="dual-type-select-2"
                            value={selectedDualType2}
                            onChange={handleTypeChange2}
                        >
                            <option value="">--Select a Type--</option>
                            {availableTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="submit-button-container">
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default DamageRelationsForm;