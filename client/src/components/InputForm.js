import { useState } from 'react';

function InputForm({ onFormSubmit }) {
    const [input, setInput] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onFormSubmit(input)
    }
  
    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <textarea
          className="form-input textbox"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add text here...'
          />
        <button className="submit-button" type="submit"><span className="text">Submit</span></button>
      </form>
    )
  }

  export default InputForm;