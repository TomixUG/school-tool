import React from 'react';

function Deck(props) {
  return (
    <div>
      <h1>Deck</h1>
      <p>{props.match.params.id}</p>
    </div>
  );
}

export default Deck;
