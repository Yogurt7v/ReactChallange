import React, { useState } from 'react';

function PasswordInput({ minimum = 8 }) {
  const [inputValue, setInputValue] = useState('');
  const [isInputValueVisible, setIsInputVisible] = useState(false);
  const [thresholdMet, setThresholdMet] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (inputValue.length >= minimum) {
      setThresholdMet(true);
    } else {
      setThresholdMet(false);
    }
  };

  const handleToggleVisibility = () => {
    setIsInputVisible(!isInputValueVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (thresholdMet) {
      alert('Password submitted');
    } else {
      alert('You need a longer password');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="limited-text-input">Password:</label>
          <span className={thresholdMet ? 'no-error' : 'error'}>{inputValue.length}</span>
        </div>
        <form>
          <input
            placeholder="Enter a password"
            type={isInputValueVisible ? 'text' : 'password'}
            id="limited-text-input"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleToggleVisibility}>Lets see</button>
    </>
  );
}

export default function App() {
  return PasswordInput(4);
}
