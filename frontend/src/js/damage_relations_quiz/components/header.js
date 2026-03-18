/**
 * @file
 * Selection component for the Damage Relations Quiz.
 * It displays the selected quiz options from the Damage Relations Quiz form.
 * As well as the unselected type buttons for answering the quiz.
 * @module DamageRelations_Selection
 * @component
 */

import '../../../css/damage_relations_quiz/components/header.css'
import { UnSelectedButtons } from '../react_dnd/dropzone_components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ClickPopover, HoverPopover } from '../custom_components/popover';
import HowToPlayModal from '../custom_components/howToPlay_modal';
import { useState } from 'react';

/**
 *
 * @param {Object} props - The component's properties
 * @param {string} props.selectedSingleType - The selected single Pokémon type
 * @param {string} props.selectedDualType1 - The selected first dual Pokémon type
 * @param {string} props.selectedDualType2 - The selected second dual Pokémon type
 * @param {boolean} props.random - Indicates if the quiz is in random mode.
 * @param {string} props.TypeMode - The current type mode ("Single", "Dual", or "Pokemon")
 * @param {Object} props.pokemon - The Pokémon object containing its data
 * @param {Function} props.setQuiz - Function to update the quiz state
 * @param {Function} props.formHandleSubmit - Callback function to handle form submission
 * @returns {JSX.Element} The Selection component
 */
const Header = ({
    selectedSingleType,
    selectedDualType1,
    selectedDualType2,
    random,
    TypeMode,
    pokemon,
    setQuiz,
    formHandleSubmit,
    AnswerObject,
    dispatchAnswerObject
}) => {
    const [ShowHowToPlayModal, setShowHowToPlayModal] = useState(false);


    return (
        <div className="quiz-header-container">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs={12} md={4}>
                        <Container fluid className="quiz-info">
                            <div className="d-flex justify-content-center align-items-center">
                                <h5>Quiz Selection</h5>
                            </div>
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
                                    <p className="label">Types: <span>{selectedDualType1}-{selectedDualType2}</span></p>
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
                                    <Button
                                        variant="primary"
                                        onClick={() => { formHandleSubmit(); dispatchAnswerObject({ command: "RESET" }) }}
                                    >
                                        Randomize Again
                                    </Button>
                                )}
                                <Button
                                    variant="primary"
                                    onClick={() => { setQuiz(false); dispatchAnswerObject({ command: 'RESET' }) }}
                                >
                                    Re-select
                                </Button>
                                <Button variant="primary" onClick={() => { setShowHowToPlayModal(true); }}>
                                    How to Play
                                </Button>
                                {ShowHowToPlayModal && <HowToPlayModal onClose={() => setShowHowToPlayModal(false)} />}

                            </div>
                        </Container>
                    </Col>
                    <Col xs={12} md={8}>
                        <UnSelectedButtons AnswerObject={AnswerObject} dispatchAnswerObject={dispatchAnswerObject} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export { Header };