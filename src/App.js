import * as React from 'react';

const initialFormData = {
  name: '',
  email: '',
  address: '',
  city: '',
  zipcode: '',
};

export function MultistepFormReducer() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState(initialFormData);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
    setCurrentStep(1);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Step {currentStep} of 3</p>
      <progress value={currentStep} max={3}></progress>

      {currentStep === 1 && (
        <>
          <div>
            <label>Address</label>
            <input
              type="text"
              id="address"
              placeholder='Enter your address"'
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder='Enter your email"'
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              placeholder='Enter your name"'
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              id="city"
              placeholder='Enter your city"'
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div>
            <label>Zipcode</label>
            <input
              type="number"
              id="zipcode"
              placeholder='Enter your zipcode"'
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </>
      )}

      <div className="buttons">
        {currentStep > 1 && (
          <button onClick={handlePrevStep} type="button">
            Prev
          </button>
        )}
        {currentStep !== 3 && (
          <button onClick={handleNextStep} type="button">
            Next
          </button>
        )}
        {currentStep === 3 && <button type="submit">Submit</button>}
      </div>
    </form>
  );
}

export default function App() {
  return <div className="container">{MultistepFormReducer()}</div>;
}
