import { useDrop } from 'react-dnd';
import DraggableType from './draggable_types';
import '../../../css/damage_relations_quiz/react-dnd/dropzone_types.css';
import { Container, Row, Col } from 'react-bootstrap';

const DropZone = ({ type_effectiveness, type_multiplier, AnswerMap, setAnswerMap }) => {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'TYPE',
        drop: ({ type }) => {
            console.log("Dropped", type, "on", type_effectiveness, type_multiplier);
            const newAnswerMap = { ...AnswerMap };
            for (const [effectiveness, object] of Object.entries(newAnswerMap)) {
                for (const [multiplier, array] of Object.entries(object)) {
                    if (array.includes(type)) {
                        newAnswerMap[effectiveness][multiplier] = array.filter(t => t !== type);
                    }
                }
            }
            newAnswerMap[type_effectiveness][type_multiplier].push(type);
            console.log("AnswerMap after drop:", newAnswerMap);
            setAnswerMap(newAnswerMap);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }), [setAnswerMap]);



    const target = AnswerMap[type_effectiveness];
    const targetEntries = Object.entries(target);


    return (
        <>
            {type_effectiveness === "unSelected" ? (
                <Container fluid
                    ref={drop}
                    className={'unSelected-button-container'}
                >
                    <Container fluid className="unSelected-buttons">
                        <Row className="g-2">
                            {targetEntries.flatMap(([, arr]) => arr).map((type, i) => (
                                <Col key={type + i} xs={6} sm={4} md={3} lg={2}>
                                    <DraggableType
                                        type={type}
                                        AnswerMap={AnswerMap}
                                        setAnswerMap={setAnswerMap}
                                    >
                                        {type}
                                    </DraggableType>
                                </Col>
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
                                        {targetEntries.map(([, array]) => (
                                            array.map((type, i) => (
                                                <Col xs={6} sm={4} md={3} lg={2}>
                                                    <DraggableType
                                                        key={i}
                                                        type={type}
                                                        AnswerMap={AnswerMap}
                                                        setAnswerMap={setAnswerMap}>
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
                // <div
                //     ref={drop}
                //     className={'dropzone'}
                // >
                //     <div className="dropzone-header">
                //         <h5>{type_effectiveness}</h5>
                //         <h6>({type_multiplier})</h6>
                //     </div>
                //     <div className={`dropzone-content ${isOver ? 'hover' : ''} ${canDrop ? 'can-drop' : ''}`}>
                //         {targetEntries.map(([multiplier, array]) => (
                //             array.map((type, i) => (
                //                 <DraggableType
                //                     key={i}
                //                     type={type}
                //                     AnswerMap={AnswerMap}
                //                     setAnswerMap={setAnswerMap}>
                //                     {type}
                //                 </DraggableType>
                //             ))
                //         ))}
                //     </div>
                // </div>
            )}
        </>
    );
}

export default DropZone;