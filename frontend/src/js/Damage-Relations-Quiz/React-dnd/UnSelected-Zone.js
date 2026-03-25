
import DropZone from "js/Damage-Relations-Quiz/React-dnd/DND/Dropzone";
/**
 * @component
 * @param {Object} props - The component's properties
 * @param {Object} props.AnswerObject - The current state of the user's answers
 * @param {Function} props.dispatchAnswerObject - The dispatch function to update the AnswerObject state
 * @param {Object} props.pokemon - The Pokémon object containing its data
 * @param {string} props.TypeMode - The current type mode
 * @returns {JSX.Element} The UnSelectedButtons component, which is a DropZone for unselected types
 */
const UnSelectedButtons = ({
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

export default UnSelectedButtons;