import React from 'react'
import {useState} from 'react';

function DeleteButton({onDelete}) {
  
  return (
    <button 
      onClick={onDelete} 
      className="btn btn-error" 
      style={{height: "50px", width: "50px"}}
    >Delete
    </button>
  )
}

export default DeleteButton