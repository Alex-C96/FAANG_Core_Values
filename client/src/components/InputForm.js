import { useEffect, useRef, useState } from 'react';
import autosize from 'autosize';

function InputForm({ onFormSubmit }) {
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onFormSubmit(input)
    }

    useEffect(() => {
      if (textareaRef.current) {
        autosize(textareaRef.current);
      }
    }, []);
  
    return (
      <div className="flex flex-col justify-center">
        <form className="card bg-primary shadow-xl flex-initial" onSubmit={handleSubmit}>
        <div className="card-body">
          <textarea
          ref={textareaRef}
          className="textarea textarea-bordered textarea-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add text here...'
          />
          <div className="justify-end card-actions">
            <button className="btn btn-accent" type="submit">Submit</button>
          </div>
        </div>
        
      </form>
      </div>
      
    )
  }

  export default InputForm;