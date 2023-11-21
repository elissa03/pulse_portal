import React from "react";
import Nav from "../Nav/Nav";

const Home = ({Toggle}) => {
  return (
    <div className="px-3">
      <Nav Toggle={Toggle}/>
      <h3>*Display user workout progress*</h3>
    </div>
  );
};

export default Home;
