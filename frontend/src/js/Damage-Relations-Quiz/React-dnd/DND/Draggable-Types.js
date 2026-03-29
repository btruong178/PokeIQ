/**
 * @file
 * DraggableType component for the Damage Relations Quiz.
 */
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import 'css/Damage-Relations-Quiz/React-dnd/DND/Draggable-Types.css';
import { Button } from 'react-bootstrap';
import { styleLookup } from './Type-Utilities.js';

/**
 * @memberof module:DamageRelations-ReactDND
 * @description
 * DraggableType is a React component that represents a draggable Pokémon type button within the DropZone components in the Damage Relations Quiz. <br>
 * @param {Object} props - The component's properties
 * @param {string} props.type - The Pokémon type represented by this draggable button
 * @param {string} props.multiplier - The current damage multiplier for this type (e.g., "x2", "x0.5", "N/A")
 * @param {Function} props.dispatchAnswerObject - The dispatch function to update the AnswerObject state
 * @param {string} props.TypeMode - The current type mode
 * @param {module:DamageRelations-Logic~Pokemon} props.pokemon - The Pokémon object containing its data
 * @returns {JSX.Element} The DraggableType component, which is a draggable button representing a Pokémon type
 */
const DraggableType = ({ type, multiplier, dispatchAnswerObject, TypeMode, pokemon }) => {
    // Set up the drag source using react-dnd's useDrag hook
    const [collectObject, drag, preview] = useDrag({
        type: 'TYPE',
        item: { type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Set the drag preview to an empty image so that the default ghost is hidden.
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    // Handle click event to send the type back to the unSelected zone
    const sendBacktoUnSelectedOnClick = () => {
        console.log("Clicked on type:", type);
        if (multiplier === "N/A") {
            console.log("Type is already in unSelected");
            return;
        }
        dispatchAnswerObject({
            command: 'MOVE_TYPE',
            payload: { typeToMove: type, effectiveness: "unSelected", multiplier: "N/A" }
        });
    }
    // Determine multiplier button style based on the current multiplier and type mode
    const getbuttonStyle = () => {
        if ((multiplier === "x1" || multiplier === "x0") || (TypeMode === "Single" || (TypeMode === "Pokemon" && pokemon.type.length === 1))) {
            return "multiplier-button-deactivated";
        } else if (multiplier === "x0.5" || multiplier === "x0.25" || multiplier === "x2" || multiplier === "x4") {
            return "multiplier-button";
        }
    }
    const buttonStyle = getbuttonStyle();

    return (
        <div
            ref={drag}
            className={[
                'draggable-type',
                styleLookup[type],
                multiplier === 'N/A' ? 'unselected' : '',
                collectObject.isDragging ? 'dragging' : ''
            ].join(' ')}
            onClick={sendBacktoUnSelectedOnClick}
        >
            {type}
            {multiplier !== "N/A" && (
                <Button
                    className={buttonStyle}
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("Clicked on multiplier:", multiplier);
                        if ((TypeMode === "Dual") || (TypeMode === "Pokemon" && pokemon.type.length > 1)) {
                            dispatchAnswerObject({
                                command: 'SWITCH_MULTIPLIER',
                                payload: { type, multiplier }
                            });
                        }
                    }}
                >
                    {multiplier}
                </Button>
            )}
        </div>
    );
}

export default DraggableType;