import DropZone from "js/Damage-Relations-Quiz/React-dnd/DND/Dropzone";
import { useEffect } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useArgs } from "storybook/preview-api";
import { defaultResponseState, defaultPokemon } from "js/Damage-Relations-Quiz/Logic-Handling/Default-Values";


export default {
    title: 'Damage Relations Quiz/React-dnd/DropZone',
    component: DropZone,
    parameters: {
        docs: {
            description: {
                component: "DropZone component for the Damage Relations Quiz <br> Represents a drop target for draggable Pokémon types <br> Populates itself with DraggableType components based on the current state of the Quiz"
            }
        }
    },
    args: {
        type_effectiveness: "Immune-To",
        type_multiplier: "x1",
        AnswerObject: defaultResponseState,
        dispatchAnswerObject: () => { },
        pokemon: defaultPokemon,
        TypeMode: "Single"
    },
    argTypes: {
        type_effectiveness: {
            control: 'select',
            options: Object.keys(defaultResponseState)
        },
        type_multiplier: {
            control: false,
            table: { disable: true }
        },
        AnswerObject: {
            control: false,
            table: { disable: true }
        },
        dispatchAnswerObject: {
            control: false,
            table: { disable: true }
        },
        pokemon: {
            control: false,
            table: { disable: true }
        },
        TypeMode: {
            control: 'select',
            options: ['Single', 'Dual']
        }
    }
}


export const Default = {
    render: (args) => {
        const [_, updateArgs] = useArgs();
        const SingleEffectivenessMapping = {
            "unSelected": "N/A",
            "Immune-To": "x0",
            "Resistant-To": "x0.5",
            "Normally-Damaged": "x1",
            "Weak-To": "x2"
        };
        const DualEffectivenessMapping = {
            "unSelected": "N/A",
            "Immune-To": "x0",
            "Resistant-To": "x0.5 / x0.25",
            "Normally-Damaged": "x1",
            "Weak-To": "x2 / x4"
        }
        useEffect(() => {
            if (args.TypeMode === "Single") {
                updateArgs({ type_multiplier: SingleEffectivenessMapping[args.type_effectiveness] });
            } else if (args.TypeMode === "Dual") {
                updateArgs({ type_multiplier: DualEffectivenessMapping[args.type_effectiveness] });
            }
            console.log("Updated type multiplier to: ", args.type_multiplier);
        }, [args.type_effectiveness, args.TypeMode]);

        return (
            <DndProvider backend={HTML5Backend}>
                <DropZone {...args} />
            </DndProvider>
        );
    }
}