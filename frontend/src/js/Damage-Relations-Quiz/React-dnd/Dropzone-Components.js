/**
 * @file
 * This file compiles all react-dnd components for use in the Damage Relations Quiz components
 * 
 * Responsibilities:
 * - Provide reusable components for the quiz's drag-and-drop interface
 * - Manage the state and interactions for dragging and dropping Pokémon types into the appropriate zones based on their damage relations
 *
 * @module DamageRelations-DropZoneComponents
 */
import DropZone from "./Dropzone";
/**
 * @component
 * @param {Object} props - The component's properties
 * @param {Object} props.AnswerObject - The current state of the user's answers
 * @param {Function} props.dispatchAnswerObject - The dispatch function to update the AnswerObject state
 * @param {Object} props.pokemon - The Pokémon object containing its data
 * @param {string} props.TypeMode - The current type mode
 * @returns {JSX.Element} The UnSelectedButtons component, which is a DropZone for unselected types
 */
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
/**
 * @component
 * @param {Object} props - The component's properties
 * @param {Object} props.AnswerObject - The current state of the user's answers
 * @param {Function} props.dispatchAnswerObject - The dispatch function to update the AnswerObject state
 * @param {Object} props.pokemon - The Pokémon object containing its data
 * @param {string} props.TypeMode - The current type mode
 * @returns {JSX.Element} A collection of DropZone components for each type effectiveness zone
 */
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