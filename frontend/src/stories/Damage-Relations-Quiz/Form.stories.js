import { useState } from 'react';
import { action } from 'storybook/actions';
import Form from 'js/Damage-Relations-Quiz/Components/Form.js';

export default {
    title: 'Damage Relations Quiz/Form',
    component: Form,
    parameters: {
        docs: {
            description: {
                component: 'Form component for Damage Relations Quiz <br> Options that are presented before being able to take the Damage Relations Quiz <br>'
            },
        },
    },
};

const className = 'sb-raw-form';

export const Default = {
    render: () => {
        const [random, setRandom] = useState(false);
        const [TypeMode, setTypeMode] = useState('Single');
        const [selectedSingleType, setSelectedSingleType] = useState('');
        const [selectedDualType1, setSelectedDualType1] = useState('');
        const [selectedDualType2, setSelectedDualType2] = useState('');

        return (
            <div className={className}>
                <Form
                    random={random}
                    TypeMode={TypeMode}
                    selectedSingleType={selectedSingleType}
                    selectedDualType1={selectedDualType1}
                    selectedDualType2={selectedDualType2}
                    setRandom={setRandom}
                    setTypeMode={setTypeMode}
                    handleTypeChange={(e) => setSelectedSingleType(e.target.value)}
                    handleTypeChange1={(e) => setSelectedDualType1(e.target.value)}
                    handleTypeChange2={(e) => setSelectedDualType2(e.target.value)}
                    formHandleSubmit={() => action('formHandleSubmit')({
                        random,
                        TypeMode,
                        selectedSingleType,
                        selectedDualType1,
                        selectedDualType2
                    })}
                />
            </div>
        );
    },
};