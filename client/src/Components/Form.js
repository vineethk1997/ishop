import React from 'react';
import '../Components/ComponentCSS/Form.css';

function Form({ children }) {
  return (
    <div className="form-container-wrapper">
      <div className="form-container">
        {children}
      </div>
    </div>
  );
}

export default Form;
