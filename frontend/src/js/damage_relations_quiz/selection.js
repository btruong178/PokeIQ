import { availableTypes } from "./logic";
import '../../css/damage_relations_quiz/selection.css'

const Selection = ({ selectedSingleType, selectedDualType1, selectedDualType2, TypeMode, quiz, setQuiz }) => {


    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div className="quiz-info">
                    <h5>Quiz Selection</h5>
                    {TypeMode === "Single" && (
                        <>
                            <p>Mode: {TypeMode}</p>
                            <p>{selectedSingleType}</p>
                        </>
                    )}
                    {TypeMode === "Dual" && (
                        <>
                            <p>Mode: {TypeMode}</p>
                            <p>{selectedDualType1} / {selectedDualType2}</p>
                        </>
                    )}
                    {TypeMode === "Pokemon" && (
                        <>
                            <p>Mode: {TypeMode}</p>
                            <p>Random Pokémon</p>
                        </>
                    )}
                    <button onClick={() => setQuiz(false)}>Restart</button>
                </div>
            </div>
            {/* <div className="type-toggle">
                {availableTypes.map((type, index) => (
                    <div key={index} className="type-option">
                        <label htmlFor={`type-${index}`}>{type}</label>
                        <input type="checkbox" id={`type-${index}`} value={type} />
                    </div>
                ))}
            </div> */}

        </div>
    )
}

export { Selection };