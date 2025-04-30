import DropZone from "./react-dnd/dropzone_types";

const UnSelectedButtons = ({ AnswerMap, setAnswerMap }) => {

    return (
        <DropZone
            type_effectiveness={"unSelected"}
            type_multiplier={"N/A"}
            AnswerMap={AnswerMap}
            setAnswerMap={setAnswerMap} />
    );
}

const TypeZones = ({ AnswerMap, setAnswerMap }) => {
    const categories = ["Normally Damaged By", "Weak To", "Immune To", "Resistant To"];

    return (
        <DropZone
            type_effectiveness={"Normally Damaged By"}
            type_multiplier={"x1"}
            AnswerMap={AnswerMap}
            setAnswerMap={setAnswerMap} />
    )
}

export { UnSelectedButtons, TypeZones };