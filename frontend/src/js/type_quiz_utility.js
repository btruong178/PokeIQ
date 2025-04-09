import React, { useState, useEffect } from 'react';
import '../css/type_quiz.css';


const arrayOfSelectedPokemonTypes = (str) => {
    try {
        const splitStr = str.split('/');
        return splitStr.map((s) => s.charAt(0).toUpperCase() + s.slice(1));
    } catch (error) {
        console.error('Error creating arrayOfSelectedPokemonTypes:', error);
    }
};

const capitalizePokemonStrings = (str) => {
    try {
        if (str.includes('/')) {
            const splitStr = str.split('/');
            return splitStr.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('-');
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
        console.error('Error capitalizing Pokémon strings:', error);
    }
};

const availableTypes = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
    'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
    'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];


function Types({ onTypeSelect, damageSelections, currentDamage, currentType, correctTypeAdvantage }) {
    const [selectedTypes, setSelectedTypes] = useState([]);

    useEffect(() => {
        setSelectedTypes(damageSelections[currentType]?.[currentDamage] || []);
    }, [damageSelections, currentDamage, currentType]);

    const handleButtonClick = (type) => {
        try {
            let newSelectedTypes;
            if (damageSelections[currentType][currentDamage].includes(type)) {
                newSelectedTypes = damageSelections[currentType][currentDamage].filter(t => t !== type);
            } else {
                newSelectedTypes = [...damageSelections[currentType][currentDamage], type];
            }
            damageSelections[currentType][currentDamage] = newSelectedTypes;
            setSelectedTypes(newSelectedTypes);
            onTypeSelect(damageSelections);
        } catch (error) {
            console.error("Error in handleButtonClick:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };



    return (
        <div className="type-selector">
            <div className="type-header">
                <h3>Pick the Correct Types!</h3>
                <div className="type-header-buttons">
                    <button className="reset-button">Reset</button>
                    <button className="reset-all-button">Reset All</button>
                </div>
            </div>


            <div className="button-group">
                {availableTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleButtonClick(type)}
                        className={selectedTypes.includes(type) ? 'selected' : 'unselected'}
                    >
                        {type}
                    </button>
                ))}

            </div>
            <SubmitButton correctTypeAdvantage={correctTypeAdvantage} damageSelections={damageSelections}></SubmitButton>
        </div>
    );
}

function SubmitButton({ correctTypeAdvantage, damageSelections }) {
    // Handle submit button click
    const submitButton = () => {
        let correct = correctTypeAdvantage;
        let selected = damageSelections;
        console.log("Correct Type Advantage: ", correct);
        console.log("Selected Type Advantage: ", selected);
        checkCorrectness({ correct, selected });
    };
    // Check if the selected types are correct
    const checkCorrectness = ({ correct, selected }) => {
        console.log("Checking Correctness");
        const wrongAnswersObject = {};
        // Initialize the wrong answers object
        Object.keys(correct).forEach((key) => {
            wrongAnswersObject[key] = {
                missing: {},
                incorrect: {}
            };
            Object.keys(correct[key]).forEach((relation) => {
                // Initialize empty array or maybe filter between correct and selected?
                wrongAnswersObject[key].missing[relation] = [];
                wrongAnswersObject[key].incorrect[relation] = [];
            });
        });
        console.log("Wrong Answers Object: ", wrongAnswersObject);
        for (let i = 0; i < Object.keys(correct).length; i++) {
            const [typeNameCorrect, typeArrayCorrect] = Object.entries(correct)[i];
            const [typeNameSelected, typeArraySelected] = Object.entries(selected)[i];
            console.log(typeNameCorrect, "Correct:", typeArrayCorrect);
            console.log(typeNameSelected, "Selected:", typeArraySelected);
        }
    }



    return (
        <button className="submit-button" onClick={() => submitButton()}>Submit</button>
    )
}

function TypeToggle({ types, currentType, onTypeToggle }) {
    // Use local state for selected type and initialize it with the prop.
    const [selectedType, setSelectedType] = useState(currentType);

    // Update local state when parent’s currentType changes.
    useEffect(() => {
        setSelectedType(currentType);
    }, [currentType]);

    const handleButtonClick = (type) => {
        setSelectedType(type);
        onTypeToggle(type);
    }

    return (
        <div className="typeToggle">
            {types.map((type) => (
                <button
                    key={type}
                    onClick={() => handleButtonClick(type)}
                    className={selectedType === type ? 'selected' : 'unselected'}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}

function DamageSelector({ onDamageSelect }) {
    const [damage, setDamage] = useState('doubleTo');

    const handleDamageChange = (event) => {
        const previousDamage = damage;
        const newDamage = event.target.value;
        setDamage(newDamage);
        onDamageSelect({ previousDamage, newDamage });
    };

    return (
        <div className="damage-selector">
            <div className="damage-outgoing">
                <h3>Damage Outgoing</h3>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="noDamageTo"
                            checked={damage === 'noDamageTo'}
                            onChange={handleDamageChange}
                        />
                        <span>0x</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="halfTo"
                            checked={damage === 'halfTo'}
                            onChange={handleDamageChange}
                        />
                        <span>0.5x</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="doubleTo"
                            checked={damage === 'doubleTo'}
                            onChange={handleDamageChange}
                        />
                        <span>2x</span>
                    </label>
                </div>
            </div>
            <div className="damage-incoming">
                <h3>Damage Incoming</h3>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="noDamageFrom"
                            checked={damage === 'noDamageFrom'}
                            onChange={handleDamageChange}
                        />
                        <span>0x</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="halfFrom"
                            checked={damage === 'halfFrom'}
                            onChange={handleDamageChange}
                        />
                        <span>0.5x</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="doubleFrom"
                            checked={damage === 'doubleFrom'}
                            onChange={handleDamageChange}
                        />
                        <span>2x</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export { arrayOfSelectedPokemonTypes, capitalizePokemonStrings, Types, DamageSelector, TypeToggle };
