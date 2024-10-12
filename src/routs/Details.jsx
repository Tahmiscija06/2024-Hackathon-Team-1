import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const { title } = location.state || { title: 'No title provided' }; // Dobij naziv jela
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${title}`, {
          headers: {
            'X-Api-Key': 'bEVoUseoi94xAJOSpBaT4A==HWCrBp6tgHTsLfYK' 
          }
      })
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data); // Postavi dobijene podatke
        console.log('recipe', recipe)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [title]); // Efekat zavisi od 'title'

  if (loading) {
    return <h2>Loading...</h2>; // Prikaz loading indikatora
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Prikaz greške
  }

  if (!recipe) {
    return <p>No recipe found.</p>; // Ako nema recepta
  }
  const Stepstoprepare = () => {
    navigate('/list', { state: title });
  }

  return (
    <div>
      <h1>Recipe Details</h1>
      <h2>Details for: {title}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {recipe[0].ingredients.split('|').map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button onClick={Stepstoprepare}>Steps to Prepare</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      
    </div>
  );
};

export default Details;