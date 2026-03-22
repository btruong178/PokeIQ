/**
 * @file dropzone_components.js
 * This file compiles all react-dnd components for use in the Damage Relations Quiz components
 * It includes the DropZones and Draggable type buttons for each section of the quiz
 * Responsibilities:
 * - Provide reusable components for the quiz's drag-and-drop interface
 * - Manage the state and interactions for dragging and dropping Pokémon types into the appropriate zones based on their damage relations
 *
 * @module DamageRelations_DropZoneComponents
 */
import DropZone from "./dropzone";

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