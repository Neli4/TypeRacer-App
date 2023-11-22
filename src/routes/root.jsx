import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyCar1 from '../components/images/car1.jpg';
import MyCar2 from '../components/images/car2.jpg';
import MyCar3 from '../components/images/car3.jpg';



export default function Root() {
  const [name, setName] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    validateName(name);
  }, [name]);

  const validateName = (name) => {
    const regex = /^[A-Z][a-z]* [A-Z][a-z]*$/;
    setIsNameValid(regex.test(name));
  };

  const handleLevelSelection = (selectedLevel) => {
    if (isNameValid && name !== '') {
      navigate('/game', {
        state: {
          level: selectedLevel,
        },
      });
      }else{
        alert("error")
      }
  };

  return (
    <>
      <div className="container">
        <fieldset className="name">
          <label htmlFor="name">Enter Your Name:</label>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <div className="level">
          <h2>Select Game Difficulty</h2>
          <div className="buttons">
            <button
              type="button"
              onClick={() => handleLevelSelection('easy')}
            >
            <img src={MyCar1} alt="Easy" /> 
              <span>Easy</span>
            </button>
            <button
              type="button"
              onClick={() => handleLevelSelection('medium')}
            >
             <img src={MyCar2} alt="Medium" /> 
              <span>Medium</span>
            </button>
            <button
              type="button"
              onClick={() => handleLevelSelection('hard')}
            >
             <img src={MyCar3} alt="Hard" /> 
              <span>Hard</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
