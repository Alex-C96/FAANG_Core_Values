import { useState } from 'react';

function InputForm({ onFormSubmit }) {
    const [input, setInput] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onFormSubmit(input)
    }
  
    return (
      <form className="card bg-base-100 shadow-xl" onSubmit={handleSubmit}>
        <div className="card-body">
          <textarea
          className="textarea textarea-bordered textarea-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add text here...'
          />
          <div className="justify-end card-actions">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>
        
      </form>
    )
  }

  export default InputForm;