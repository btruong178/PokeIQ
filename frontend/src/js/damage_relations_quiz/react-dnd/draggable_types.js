import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import '../../../css/damage_relations_quiz/react-dnd/draggable_types.css';
import { Button } from 'react-bootstrap';

export const styleLookup = {
    Normal: 'type-normal',
    Fire: 'type-fire',
    Water: 'type-water',
    Electric: 'type-electric',
    Grass: 'type-grass',
    Ice: 'type-ice',
    Fighting: 'type-fighting',
    Poison: 'type-poison',
    Ground: 'type-ground',
    Flying: 'type-flying',
    Psychic: 'type-psychic',
    Bug: 'type-bug',
    Rock: 'type-rock',
    Ghost: 'type-ghost',
    Dragon: 'type-dragon',
    Dark: 'type-dark',
    Steel: 'type-steel',
    Fairy: 'type-fairy'
};

const DraggableType = ({ type, multiplier, dispatchAnswerObject, TypeMode, pokemon }) => {
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

    const sendBacktoUnSelectedOnClick = () => {
        console.log("Clicked on type:", type);
        if (multiplier === "N/A") {
            console.log("Type is already in unSelected");
            return;
        }
        dispatchAnswerObject({
            command: 'REMOVE_TYPE',
            payload: { type }
        });
        dispatchAnswerObject({
            command: 'ADD_TYPE',
            payload: { type, effectiveness: "unSelected", multiplier: "N/A" }
        });
    }
    const getbuttonStyle = () => {
        if ((multiplier === "x1" || multiplier === "x0") ||
            (TypeMode === "Single" || (TypeMode === "Pokemon" && pokemon.type.length === 1))) {
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