import React from 'react';

function ShowPets() {
  return (
    <div>
      <h1>Welcome --- user -- !</h1>
      <p>This page will show selected pets.</p>
      <ul>
        <li>Pet 1</li>
        <li>Pet 2</li>
        <li>Pet 3</li>
      </ul>

      <a href="/">
        <button>Add a Pet!</button>
      </a>
    </div>
    
  );
}

export default ShowPets;
