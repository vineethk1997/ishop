import React from 'react';
import '../Components/ComponentCSS/Message.css'


function Message({ variant = 'info', children }) {
  return (
    <div className={`alert alert-${variant}`}>
      {children}
    </div>
  );
}

export default Message;
