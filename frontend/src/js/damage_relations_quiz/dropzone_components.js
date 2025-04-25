import DropZone from "./react-dnd/dropzone_types";

const TypeButtons = ({ AnswerMap, setAnswerMap }) => {

    return (
        <DropZone
            type_effectiveness={"unSelected"}
            type_multiplier={"unSelected"}
            AnswerMap={AnswerMap}
            setAnswerMap={setAnswerMap} />
    );
}

const TypeZones = ({ AnswerMap, setAnswerMap }) => {
    const categories = ["Normally Damaged by", "Weak To", "Immune To", "Resistant To"];

    return (
        <DropZone
            type_effectiveness={"Normally Damaged by"}
            type_multiplier={"x1"}
            AnswerMap={AnswerMap}
            setAnswerMap={setAnswerMap} />
    )
}

export { TypeButtons, TypeZones };