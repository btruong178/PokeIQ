import DropZone from "./react-dnd/dropzone_types";

const UnSelectedButtons = ({ AnswerObject, dispatchAnswerObject }) => {

    return (
        <DropZone
            type_effectiveness={"unSelected"}
            type_multiplier={"N/A"}
            AnswerObject={AnswerObject}
            dispatchAnswerObject={dispatchAnswerObject}
        />
    );
}

const TypeEffectivenessZones = ({ AnswerObject, dispatchAnswerObject }) => {
    const entries = Object.entries(AnswerObject).filter(([effectiveness, multObj]) => {
        if (effectiveness === "unSelected") {
            return false;
        } else {
            return true;
        }
    })


    return (
        <>
            {entries.map(([effectiveness, multObj]) => {
                const firstMultiplier = Object.keys(multObj)[0];
                return (
                    <DropZone
                        key={effectiveness}
                        type_effectiveness={effectiveness}
                        type_multiplier={firstMultiplier}
                        AnswerObject={AnswerObject}
                        dispatchAnswerObject={dispatchAnswerObject}
                    />
                );
            })}
        </>

    )
}

export { UnSelectedButtons, TypeEffectivenessZones };