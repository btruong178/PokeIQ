import { availableTypes } from "./logic";

const Selection = ({ selectedSingleType, selectedDualType1, selectedDualType2, TypeMode, quiz, setQuiz }) => {


    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Quiz Selection</h2>
                {TypeMode === "Single" ? (
                    <>
                        <p>Mode: {TypeMode}</p>
                        <p>{selectedSingleType}</p>
                    </>
                ) : (
                    <>
                        <p>Mode: {TypeMode}</p>
                        <p>{selectedDualType1} and {selectedDualType2}</p>
                    </>
                )}
            </div>
            <div className="type-toggle">
                {availableTypes.map((type, index) => (
                    <div key={index} className="type-option">
                        <label htmlFor={`type-${index}`}>{type}</label>
                        <input type="checkbox" id={`type-${index}`} value={type} />
                    </div>
                ))}
            </div>
            <button onClick={() => setQuiz(false)}>Restart</button>
        </div>
    )
}

export { Selection };