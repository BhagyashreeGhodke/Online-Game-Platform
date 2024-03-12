import React from 'react';
import { FaGamepad } from 'react-icons/fa'; // Importing the gamepad icon
import { Link } from 'react-router-dom';

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center">
     
      <FaGamepad className="text-primary animate-bounce" style={{ fontSize: width }} />  <Link to= '/'>
      <h1 className="text-lg font-bold text-black ml-2 animate-slideIn --logo-color">Online Game Platform</h1>
      </Link> {/* Use heading element for the text */}
    </div>
  );
}

export default Logo;
