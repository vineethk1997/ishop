import React from 'react';
import '../Components/ComponentCSS/Loader.css';

function Loader() {
  return (
    <div className="spinner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Loader;