import React from 'react'
import Nav from "../Nav/Nav";

function Workouts({Toggle}) {
  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
    </div>
  );
}

export default Workouts