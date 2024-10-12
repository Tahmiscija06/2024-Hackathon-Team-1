import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const List = () => {
    const location = useLocation();
    const [title, setTitle] = useState(location.state);
    const [steps, setSteps] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${title}`, {
                    headers: {
                        'X-Api-Key': 'bEVoUseoi94xAJOSpBaT4A==HWCrBp6tgHTsLfYK'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                console.log(data[0].instructions);
                
                setSteps(data[0].instructions.split('. '));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [title]); // Effect depends on 'title'

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Render loading, error, or recipe steps
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (steps.length === 0) {
        return <p>No recipe steps available.</p>;
    }

    return (
        <div>
            <div className="slider">
                <button onClick={prevStep} disabled={currentStep === 0}>Previous</button>
                <span>{steps[currentStep]}</span>
                <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</button>
            </div>
        </div>
    );
};

export default List;
