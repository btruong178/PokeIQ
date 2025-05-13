import { useDrop } from 'react-dnd';
import DraggableType from './draggable_types';
import '../../../css/damage_relations_quiz/react-dnd/dropzone_types.css';
import { Container, Row, Col } from 'react-bootstrap';


const DropZone = ({ type_effectiveness, type_multiplier, AnswerObject, dispatchAnswerObject }) => {

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



    const target = AnswerObject[type_effectiveness];
    const targetEntries = Object.entries(target);


    return (
        <>
            {type_effectiveness === "unSelected" ? (
                <Container fluid
                    ref={drop}
                    className={`unSelected-button-container ${isOver ? 'hover' : ''} ${canDrop ? 'can-drop' : ''}`}
                >
                    <Container fluid className="unSelected-buttons">
                        <Row className="g-2">
                            {targetEntries.map(([multiplier, array]) => (
                                array.map((type, i) => (
                                    <Col xs={6} sm={4} md={3} lg={2}>
                                        <DraggableType
                                            key={i}
                                            type={type}
                                            multiplier={multiplier}
                                            dispatchAnswerObject={dispatchAnswerObject}
                                        >
                                            {type}
                                        </DraggableType>
                                    </Col>
                                ))
                            ))}
                        </Row>
                    </Container>
                </Container>
            ) : type_effectiveness !== "unSelected" && (
                <Container fluid
                    ref={drop}
                    className={'dropzone'}
                >
                    <Container fluid>
                        <Row className="g-2">
                            <Col xs={12} md={2}>
                                <Container fluid className="dropzone-header">
                                    <h5>{type_effectiveness}</h5>
                                    <h6>({type_multiplier})</h6>
                                </Container>
                            </Col>
                            <Col xs={12} md={10}>
                                <Container fluid className={`dropzone-content ${isOver ? 'hover' : ''} ${canDrop ? 'can-drop' : ''}`}>
                                    <Row className="g-2">
                                        {targetEntries.map(([multiplier, array]) => (
                                            array.map((type, i) => (
                                                <Col xs={6} sm={4} md={3} lg={2}>
                                                    <DraggableType
                                                        key={i}
                                                        type={type}
                                                        multiplier={multiplier}
                                                        dispatchAnswerObject={dispatchAnswerObject}
                                                    >
                                                        {type}
                                                    </DraggableType>
                                                </Col>
                                            ))
                                        ))}
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            )}
        </>
    );
}

export default DropZone;