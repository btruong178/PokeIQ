import { useDrop } from 'react-dnd';
import DraggableType from './draggable_types';
import '../../../css/damage_relations_quiz/react-dnd/dropzone_types.css';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';


const DropZone = ({
    type_effectiveness,
    type_multiplier,
    AnswerObject,
    dispatchAnswerObject,
    pokemon,
    TypeMode
}) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'TYPE',
        drop: ({ type }) => {
            console.log("Dropped", type, "on", type_effectiveness, type_multiplier);
            dispatchAnswerObject({
                command: 'REMOVE_TYPE',
                payload: { type }
            });
            dispatchAnswerObject({
                command: 'ADD_TYPE',
                payload: { type, effectiveness: type_effectiveness, multiplier: type_multiplier }
            });
            console.log("Dispatched ADD_TYPE with", type, type_effectiveness, type_multiplier);
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

    const target = AnswerObject[type_effectiveness];
    const droppables = Object.entries(target).map(([mult, arr]) =>
        arr.map((type, idx) => (
            <React.Fragment key={`${type}-${mult}-${idx}`}>
                <Col xs={6} sm={4} md={3} lg={2}>
                    <DraggableType
                        type={type}
                        multiplier={mult}
                        dispatchAnswerObject={dispatchAnswerObject}
                    >
                        {type}
                    </DraggableType>
                </Col>

                { /* Insert a full-width rule after the last x0.5 if x0.25 exists */}
                {mult === 'x0.5'
                    && target['x0.25']?.length > 0
                    && idx === arr.length - 1 && (
                        <Col xs={12}>
                            <hr className="dropzone-mult-divider" />
                        </Col>
                    )}
            </React.Fragment>
        ))
    );


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