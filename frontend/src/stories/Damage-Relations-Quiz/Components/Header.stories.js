
import DamageRelationsHeader from "js/Damage-Relations-Quiz/Components/Header.js";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { defaultResponseState } from "js/Damage-Relations-Quiz/Logic-Handling/Default-Values";
import { action } from "storybook/actions";
import { availableTypes } from "js/Damage-Relations-Quiz/Logic-Handling/Logic";
import { useArgs } from "storybook/preview-api";
import { getRandomSingleType, getRandomDualType } from "js/Damage-Relations-Quiz/Logic-Handling/Logic";

const pokemonList = {
    Pikachu: { id: 25, name: "Pikachu", type: ["Electric"], dmg_data: {} },
    Charizard: { id: 6, name: "Charizard", type: ["Fire", "Flying"], dmg_data: {} },
    Bulbasaur: { id: 1, name: "Bulbasaur", type: ["Grass", "Poison"], dmg_data: {} },
    Pigeotto: { id: 22, name: "Pigeotto", type: ["Normal", "Flying"], dmg_data: {} },
    Gyarados: { id: 130, name: "Gyarados", type: ["Water", "Flying"], dmg_data: {} },
    Onix: { id: 95, name: "Onix", type: ["Rock", "Ground"], dmg_data: {} },
    Eevee: { id: 133, name: "Eevee", type: ["Normal"], dmg_data: {} },
    Sprigatito: { id: 906, name: "Sprigatito", type: ["Grass"], dmg_data: {} },
}

export default {
    title: 'Damage Relations Quiz/Header',
    component: DamageRelationsHeader,
    parameters: {
        docs: {
            description: {
                component: "Header component for Damage Relations Quiz <br> Displays the title and the selected type(s) for the quiz <br>"
            }
        }
    },
    argTypes: {
        selectedSingleType: {
            control: 'select',
            options: availableTypes
        },
        selectedDualType1: {
            control: 'select',
            options: availableTypes
        },
        selectedDualType2: {
            control: 'select',
            options: availableTypes
        },
        random: {
            control: 'boolean'
        },
        TypeMode: {
            control: 'select',
            options: ['Single', 'Dual', 'Pokemon']
        },
        pokemon: {
            control: 'select',
            options: ["Pikachu", "Charizard", "Bulbasaur", "Pigeotto", "Gyarados", "Onix", "Eevee", "Sprigatito"],
            mapping: {
                Pikachu: pokemonList.Pikachu,
                Charizard: pokemonList.Charizard,
                Bulbasaur: pokemonList.Bulbasaur,
                Pigeotto: pokemonList.Pigeotto,
                Gyarados: pokemonList.Gyarados,
                Onix: pokemonList.Onix,
                Eevee: pokemonList.Eevee,
                Sprigatito: pokemonList.Sprigatito
            }
        },
        AnswerObject: {
            control: false,
            table: { disable: true },
        },
        setQuiz: {
            control: false,
            table: { disable: true },
        },
        formHandleSubmit: {
            control: false,
            table: { disable: true },
        },
        dispatchAnswerObject: {
            control: false,
            table: { disable: true },
        }
    },
    args: {
        selectedSingleType: 'Fire',
        selectedDualType1: 'Water',
        selectedDualType2: 'Flying',
        random: false,
        TypeMode: 'Single',
        pokemon: pokemonList.Pikachu,
        setQuiz: () => { },
        AnswerObject: defaultResponseState,
        dispatchAnswerObject: () => action('Re-select')({
            Action: 'Form Component is rendered so user can change their selections',
            Random: 'Also triggered when user clicks the "Randomize" button as the internal workings of the "Random" function' +
                'quickly uses the form component to reset the quiz state before fetching new ' +
                'data and re-rendering the form with new selections'
        })
    },
};
export const Default = {
    render: (args) => {
        const [_, updateArgs] = useArgs();

        const handleRandomize = () => {
            action('Randomize')({ Action: 'Re-initializes quiz with random selections' });

            if (args.TypeMode === 'Single') {
                updateArgs({ selectedSingleType: getRandomSingleType() });
            } else if (args.TypeMode === 'Dual') {
                const [type1, type2] = getRandomDualType();
                updateArgs({ selectedDualType1: type1, selectedDualType2: type2 });
            } else if (args.TypeMode === 'Pokemon') {
                const randomPokemon = Object.values(pokemonList)[Math.floor(Math.random() * Object.values(pokemonList).length)];
                updateArgs({ pokemon: randomPokemon });
            }
        };
        return (
            <DndProvider backend={HTML5Backend}>
                <DamageRelationsHeader
                    {...args}
                    formHandleSubmit={handleRandomize}
                />
            </DndProvider>
        );
    }
};
