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
import { Container, Row, Col, Button, Form } from "react-bootstrap";

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
        <Container fluid className="form-container background">
            <Row className="form-header">
                <Col>
                    <h1>Damage Relations</h1>
                    <hr />
                    <p>
                        Welcome to the Damage Relations page!
                    </p>
                    <p>
                        Here you can quiz yourself
                        on damage relations of each type!
                    </p>
                    <p>
                        Select your mode(s) and type(s) to
                        get started.
                    </p>
                </Col>
                <hr />
            </Row>

            <Row className="toggles-options justify-content-center">
                <Col xs="auto" className="random-toggle">
                    <Form.Label>Random Mode:</Form.Label>
                    <Form.Check
                        type="checkbox"
                        id="random"
                        checked={random}
                        onChange={() => setRandom(!random)}
                    />
                </Col>

                <Col xs="auto" className="type-mode-toggle">
                    <Form.Group controlId="type-mode-toggle" className="mb-3">
                        <Form.Label>Select Type Mode:</Form.Label>
                        <Form.Select
                            value={TypeMode}
                            onChange={(e) => setTypeMode(e.target.value)}
                        >
                            <option value="Single">Single</option>
                            <option value="Dual">Dual</option>
                            {random && <option value="Pokemon">Pokemon</option>}
                        </Form.Select>
                    </Form.Group>
                </Col>

                {!random && TypeMode === "Single" && (
                    <Container className="single-type-select">
                        <Form.Group controlId="single-type-select" className="mb-3">
                            <Form.Label>Choose a Type</Form.Label>
                            <Form.Select
                                value={selectedSingleType}
                                onChange={handleTypeChange}
                            >
                                <option value="">--Select a Type--</option>
                                {availableTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Container>
                )}

                {!random && TypeMode === "Dual" && (
                    <Container className="dual-type-select">
                        <Form.Group controlId="dual-type-select-1" className="mb-3">
                            <Form.Label>Choose Type 1</Form.Label>
                            <Form.Select
                                value={selectedDualType1}
                                onChange={handleTypeChange1}
                            >
                                <option value="">--Select a Type--</option>
                                {availableTypes.map((type, idx) => (
                                    <option key={idx} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="dual-type-select-2" className="mb-3">
                            <Form.Label>Choose Type 2</Form.Label>
                            <Form.Select
                                value={selectedDualType2}
                                onChange={handleTypeChange2}
                            >
                                <option value="">--Select a Type--</option>
                                {availableTypes.map((type, idx) => (
                                    <option key={idx} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Container>
                )}
            </Row>
            <Button
                variant="primary"
                className="submit-button-container"
                onClick={onSubmit}
            >
                Submit
            </Button>
        </Container>
    );
};

export default DamageRelationsForm;