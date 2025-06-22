import DropZone from "./react-dnd/dropzone_types";

export const UnSelectedButtons = ({
    AnswerObject,
    dispatchAnswerObject,
    pokemon,
    TypeMode
}) => (
    <DropZone
        type_effectiveness="unSelected"
        type_multiplier="N/A"
        AnswerObject={AnswerObject}
        dispatchAnswerObject={dispatchAnswerObject}
        pokemon={pokemon}
        TypeMode={TypeMode}
    />
);

export const TypeEffectivenessZones = ({
    AnswerObject,
    dispatchAnswerObject,
    pokemon,
    TypeMode
}) => {
    const entries = Object.entries(AnswerObject).filter(([e]) => e !== "unSelected");

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
                        pokemon={pokemon}
                        TypeMode={TypeMode}
                    />
                );
            })}
        </>
    );
};