import { useState } from 'react';

function InputForm({ onFormSubmit }) {
    const [input, setInput] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onFormSubmit(input)
    }
  
    return (
      <form className="card bg-primary shadow-xl h-96" onSubmit={handleSubmit}>
        <div className="card-body">
          <textarea
          className="textarea textarea-bordered textarea-primary h-full mb-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add text here...'
          />
          <div className="justify-end card-actions">
            <button className="btn btn-accent" type="submit">Submit</button>
          </div>
        </div>
        
      </form>
    )
  }

  export default InputForm;