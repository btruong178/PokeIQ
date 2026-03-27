/**
 * @file
 * This file defines the DropZone component for the Damage Relations Quiz.
 */
import { useDrop } from 'react-dnd';
import DraggableType from './Draggable-Types';
import 'css/Damage-Relations-Quiz/React-dnd/DND/Dropzone.css';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
/**
 * @memberof module:DamageRelations-ReactDND
 * @description
 * DropZone is a React component that represents a drop target for draggable Pokémon types in the Damage Relations Quiz. <br>
 * Populates itself with DraggableType components based on the current state of the AnswerObject.
 * @param {Object} props - The component's properties
 * @param {string} props.type_effectiveness - The effectiveness category of the type
 * @param {string} props.type_multiplier - The multiplier for the type effectiveness
 * @param {Object} props.AnswerObject - The current state of the answer object
 * @param {Function} props.dispatchAnswerObject - Function to dispatch actions to update the answer object
 * @param {module:DamageRelations-Logic~Pokemon} props.pokemon - The Pokémon object containing its data
 * @param {string} props.TypeMode - The current type mode ("Single", "Dual", or "Pokemon")
 * @returns {JSX.Element} The DropZone component
 */
const DropZone = ({
    type_effectiveness,
    type_multiplier,
    AnswerObject,
    dispatchAnswerObject,
    pokemon,
    TypeMode
}) => {
    // Set up the drop target using react-dnd's useDrop hook
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'TYPE',
        drop: ({ type }) => {
            dispatchAnswerObject({
                command: 'MOVE_TYPE',
                payload: { typeToMove: type, effectiveness: type_effectiveness, multiplier: type_multiplier }
            })
            console.log("Updated AnswerObject: ", AnswerObject);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));
    const paired = {
        "x0.5": "x0.25",
        "x0.25": "x0.5",
        "x2": "x4",
        "x4": "x2"
    };
    const zoneClass =
        type_effectiveness === "unSelected"
            ? `unSelected-button-container ${isOver ? "hover" : ""} ${canDrop ? "can-drop" : ""}`
            : "dropzone";
    const contentClass =
        type_effectiveness === "unSelected"
            ? "unSelected-buttons"
            : `dropzone-content ${isOver ? "hover" : ""} ${canDrop ? "can-drop" : ""}`;
    // Generates the draggable components for the types in the current effectiveness category based on the AnswerObject state
    const getDroppables = () => {
        const target = AnswerObject[type_effectiveness];
        return Object.entries(target).map(([mult, arr]) =>
            arr.map((type, idx) => (
                <React.Fragment key={`${type}-${mult}-${idx}`}>
                    <Col xs={6} sm={4} md={3} lg={2}>
                        <DraggableType
                            type={type}
                            multiplier={mult}
                            dispatchAnswerObject={dispatchAnswerObject}
                            TypeMode={TypeMode}
                            pokemon={pokemon}
                        >
                            {type}
                        </DraggableType>
                    </Col>

                    {((mult === 'x0.5' && target['x0.25']?.length > 0 && idx === arr.length - 1) ||
                        (mult === 'x2' && target['x4']?.length > 0 && idx === arr.length - 1))


                        && (
                            <Col xs={12}>
                                <hr className="dropzone-mult-divider" />
                            </Col>
                        )}
                </React.Fragment>
            ))
        );
    }
    // Gets text and multiplier to display in the header of the dropzone based on the current type mode and effectiveness
    const getHeaderCol = () => {
        const displayMult = (TypeMode === "Dual" && paired[type_multiplier] ||
            TypeMode === "Pokemon" && pokemon.type.length > 1 && paired[type_multiplier])
            ? `${type_multiplier} / ${paired[type_multiplier]}`
            : type_multiplier;

        return type_effectiveness === "unSelected"
            ? null
            : (
                <Col xs={12} md={2}>
                    <Container fluid className="dropzone-header">
                        <h5>{type_effectiveness}</h5>
                        <h6>( {displayMult} )</h6>
                    </Container>
                </Col>
            );
    };
    const droppables = getDroppables();
    const headerCol = getHeaderCol();
    return (
        <Container fluid ref={drop} className={zoneClass}>
            <Container fluid>
                <Row className="g-2">
                    {headerCol}
                    <Col xs={12} md={headerCol ? 10 : 12}>
                        <Container fluid className={contentClass}>
                            <Row className="g-2">
                                {droppables}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default DropZone;