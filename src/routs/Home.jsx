import React, { useState } from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleInputChange = (event) => {
      setTitle(event.target.value); 
    };
  
    const handleSearchRecipe = () => {

      navigate('/details', { state: { title } });
    };
  
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
  
    return (
      <div className="App">
       
        <div className='navbar'>
        <h3>Prepify</h3>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Food List</li>
          </ul>
        </div>
        <div>
  <div className='input'>
        <input
          type="text"
          placeholder="Enter meal name..."
          value={title} 
          onChange={handleInputChange}
          />
        <button onClick={handleSearchRecipe}>Search Recipe</button>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
  </div>
        
      </div>
    );
}

export default Home