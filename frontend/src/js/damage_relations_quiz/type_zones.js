import DropZone from "./react-dnd/dropzone_types"

const TypeZones = ({ AnswerMap, setAnswerMap }) => {


    return (
        <DropZone type_effectiveness={"Normally Damaged by"} type_multiplier={"x1"} AnswerMap={AnswerMap} setAnswerMap={setAnswerMap} />
    )
}

export default TypeZones;