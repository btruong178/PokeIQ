/**
 * @file
 * Selection component for the Damage Relations Quiz.
 * It displays the UI that the user sees after the form is submitted.
 * Users can select their answer and submit it.
 * @module DamageRelations_Selection
 * @component
 */

import '../../css/damage_relations_quiz/selection.css'
import Buttons from './buttons';

/**
  *
 * @param {Object} props - The component properties.
 * @param {string} props.selectedSingleType - The selected single Pokémon type.
 * @param {string} props.selectedDualType1 - The selected first dual Pokémon type.
 * @param {string} props.selectedDualType2 - The selected second dual Pokémon type.
 * @param {boolean} props.random - Indicates if the quiz is in random mode.
 * @param {string} props.TypeMode - The current type mode ("Single", "Dual", or "Pokemon").
 * @param {Object} props.pokemon - The Pokémon object containing its data.
 * @param {Function} props.setQuiz - Function to update the quiz state.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @returns {JSX.Element} The Selection component.
 */
const Header = ({
    selectedSingleType,
    selectedDualType1,
    selectedDualType2,
    random,
    TypeMode,
    pokemon,
    setQuiz,
    onSubmit
}) => {
    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div className="quiz-info">
                    <h5>Quiz Selection</h5>
                    <hr />
                    <p className="label">Random: <span>{random ? "On" : "Off"}</span></p>
                    <p className="label">Type Mode: <span>{TypeMode}</span></p>
                    <hr />
                    {TypeMode === "Single" && (
                        <>
                            <p className="label">Type: <span>{selectedSingleType}</span></p>
                        </>
                    )}
                    {TypeMode === "Dual" && (
                        <>
                            <p className="label">Types: <span>{selectedDualType1} / {selectedDualType2}</span></p>
                        </>
                    )}
                    {TypeMode === "Pokemon" && (
                        <>
                            <p className="label">Pokemon: <span>{pokemon.name}</span></p>
                            <p className="label">Type(s): <span>{pokemon.type.join("-")}</span></p>
                        </>
                    )}
                    <div className="quiz-info-buttons">
                        {random && (
                            <button onClick={() => onSubmit()}>Randomize Again</button>
                        )}
                        <button onClick={() => setQuiz(false)}>Re-select</button>
                    </div>
                </div>
                <Buttons pokemon={pokemon}></Buttons>
            </div>

        </div>
    )
}

export { Header };