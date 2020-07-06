import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  
  <React.StrictMode>
    <Navbar />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function Navbar(){

  return (

      <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
    <a class="navbar-brand" href="/"><h2 style={{fontFamily: "Lobster", fontSize: '4rem'}}>Clarity</h2></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          
        </li>
      </ul>
      <a class="p-2 text-dark" href="/about">Subscribe</a>
      <a class="p-2 text-dark" href="/signin">Sign In</a>
      <a class="p-2 text-dark">Write</a>
      <a style={{backgroundColor: "#55b0c9", border: "none"}}  class="btn btn-primary btn-md" href="/signup">Get Started</a>
    </div>
  </nav>

  )

}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
