import DraggableType from "js/Damage-Relations-Quiz/React-dnd/DND/Draggable-Types";
import { defaultPokemon } from "js/Damage-Relations-Quiz/Logic-Handling/Default-Values";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { availableTypes } from "js/Damage-Relations-Quiz/Logic-Handling/Logic";
import { useArgs } from "storybook/preview-api";


export default {
    title: 'Damage Relations Quiz/React-dnd/DraggableType',
    component: DraggableType,
    parameters: {
        docs: {
            description: {
                component: "DraggableType component for the Damage Relations Quiz <br> Represents a draggable Pokémon type button in the quiz <br>"
            }
        }
    },
    args: {
        type: "Fire",
        multiplier: "x2",
        TypeMode: "Single",
        pokemon: defaultPokemon
    },
    argTypes: {
        type: {
            control: 'select',
            options: availableTypes
        },
        multiplier: {
            control: 'select',
            options: ["x4", "x2", "x1", "x0.5", "x0.25", "x0", "Unselected"],
            mapping: {
                "Unselected": "N/A"
            }
        },
        TypeMode: {
            control: false,
            table: { disable: true }
        },
        pokemon: {
            control: false,
            table: { disable: true }
        },
        dispatchAnswerObject: {
            control: false,
            table: { disable: true }
        }
    }
};

export const Default = {
    render: (args) => {
        const [_, updateArgs] = useArgs();
        const multiplierMapping = {
            "x2": "x4",
            "x4": "x2",
            "x0.5": "x0.25",
            "x0.25": "x0.5",
        }

        const handleDispatch = () => {
            if (args.multiplier === "N/A" || args.multiplier === "x1" || args.multiplier === "x0") {
                return;
            }
            updateArgs(
                { ...args, multiplier: multiplierMapping[args.multiplier] }
            );
        }
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="sb-smaller-type">
                    <DraggableType {...args} dispatchAnswerObject={handleDispatch} />
                </div>
            </DndProvider>
        );
    }
};