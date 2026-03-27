/**
 * @file
 * Module for React-DND components used in the Damage Relations Quiz <br>
 * TypeEffectivenessZones and UnSelectedButtons are the main components as they compile all other components in this module
 * @module DamageRelations-ReactDND
 */
import DropZone from "js/Damage-Relations-Quiz/React-dnd/DND/Dropzone.js";
/**
 * @memberof module:DamageRelations-ReactDND
 * @description
 * TypeEffectivenessZones is a React component that renders a collection of DropZone components for each type effectiveness category. <br>
 * It maps over the entries of the AnswerObject (excluding "unSelected") and generates a DropZone for each effectiveness category.
 * @param {Object} props - The component's properties
 * @param {Object} props.AnswerObject - The current state of the user's answers
 * @param {Function} props.dispatchAnswerObject - The dispatch function to update the AnswerObject state
 * @param {module:DamageRelations-Logic~Pokemon} props.pokemon - The Pokémon object containing its data
 * @param {string} props.TypeMode - The current type mode
 * @returns {JSX.Element} A collection of DropZone components for each type effectiveness zone
 */
const TypeEffectivenessZones = ({
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

export default TypeEffectivenessZones;