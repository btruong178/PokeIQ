import React, { useEffect } from "react";
import { availableTypes } from "./logic";

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
    }, [random]);

    return (
        <>
            <div className="toggles-options">
                <div className="random-toggle">
                    <label htmlFor="random">Random?</label>
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
                        <option value="Single">Single Type</option>
                        <option value="Dual">Dual Type</option>
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
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
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
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="submit-button-container">
                <button onClick={onSubmit}>Submit</button>
            </div>
        </>
    );
};

export default DamageRelationsForm;