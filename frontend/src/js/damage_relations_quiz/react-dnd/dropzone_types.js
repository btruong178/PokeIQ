import { useDrop } from 'react-dnd';
import DraggableType from './draggable_types';
import '../../../css/damage_relations_quiz/react-dnd/dropzone_types.css';

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
                <div
                    ref={drop}
                    className={'unSelected-button-container'}
                >
                    <div className={`unSelected-buttons`}>
                        {targetEntries.map(([multiplier, array]) => (
                            array.map((type, i) => (
                                <DraggableType
                                    key={i}
                                    type={type}
                                    AnswerMap={AnswerMap}
                                    setAnswerMap={setAnswerMap}>
                                    {type}
                                </DraggableType>
                            ))
                        ))}
                    </div>
                </div>
            ) : type_effectiveness !== "unSelected" && (
                <div
                    ref={drop}
                    className={'dropzone'}
                >
                    <div className="dropzone-header">
                        <h5>{type_effectiveness}</h5>
                        <h6>({type_multiplier})</h6>
                    </div>
                    <div className={`dropzone-content ${isOver ? 'hover' : ''} ${canDrop ? 'can-drop' : ''}`}>
                        {targetEntries.map(([multiplier, array]) => (
                            array.map((type, i) => (
                                <DraggableType
                                    key={i}
                                    type={type}
                                    AnswerMap={AnswerMap}
                                    setAnswerMap={setAnswerMap}>
                                    {type}
                                </DraggableType>
                            ))
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default DropZone;