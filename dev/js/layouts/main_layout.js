import React from 'react';
import { Link } from 'react-router';


// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div id="app">
      <i className="fa fa-bars"></i>
      {props.children}
    </div>
    );
}