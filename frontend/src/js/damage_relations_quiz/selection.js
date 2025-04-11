
const Selection = ({ selectedSingleType, selectedDualType1, selectedDualType2, TypeMode, quiz, setQuiz }) => {


    return (
        <div className="quiz-container">
            <div className="selection-container">
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
            <button onClick={() => setQuiz(false)}>Restart</button>
        </div>
    )
}

export { Selection };