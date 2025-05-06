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
    const categories = ["Normally Damaged", "Weak To", "Immune To", "Resistant To"];

    return (
        <>
            <DropZone
                type_effectiveness={"Normally Damaged"}
                type_multiplier={"x1"}
                AnswerMap={AnswerMap}
                setAnswerMap={setAnswerMap} />
            <DropZone
                type_effectiveness={"Weak To"}
                type_multiplier={"x2"}
                AnswerMap={AnswerMap}
                setAnswerMap={setAnswerMap} />
            <DropZone
                type_effectiveness={"Resistant To"}
                type_multiplier={"x0.5"}
                AnswerMap={AnswerMap}
                setAnswerMap={setAnswerMap} />
            <DropZone
                type_effectiveness={"Immune To"}
                type_multiplier={"x0"}
                AnswerMap={AnswerMap}
                setAnswerMap={setAnswerMap} />

        </>
    )
}

export { UnSelectedButtons, TypeZones };