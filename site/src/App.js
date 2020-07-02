import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default function App(){
    return(
        <Router>
            <Switch>
                <Route exact path = '/'>
                    <Home />
                </Route>
                <Route path = '/about'>
                    <About />
                </Route>
                <Route path = '/signup'>
                    <Signup />
                </Route>
            </Switch>
        </Router>
    )
}

function Home(){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"><h3 style={{fontFamily: "Lobster"}}>Clairvoyance</h3></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        
      </li>
    </ul>
    <a class="p-2 text-dark" href="/about">Subscribe</a>
    <a class="p-2 text-dark" href="/signup">Sign up</a>
    <a class="p-2 text-dark">Write</a>
    <a style={{backgroundColor: "#59b38c", border: "none"}}  class="btn btn-primary btn-md" href="#">Get Started</a>
  </div>
</nav>

<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
<h2 class="display-4" style={{fontFamily: "Abril Fatface"}}>
    Get smarter about what <br /> matters to you.
</h2>
<br />
<h4>Select what you're into. We'll help you find great things to read.</h4>
<br />
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Future</span>    
</button>

<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Technology</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Science</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Physics</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Health</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Mathematics</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Computing</span> 
</button>
<br />

<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Culture</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Neuroscience</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>LGBTQ</span>    
</button>
<button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
    <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
        #
    </button>
    <span style={{fontSize: "20px", margin: "5px"}}>Cryptocurrency</span>    
</button>


</div>   

<div class="text-center">
    <button style={{backgroundColor: "#59b38c", border: "none"}} class="btn btn-primary btn-lg">
        Get Started
    </button>
    <br></br>
    <br></br>
    <span>
        Already have an account. <a href="#" style={{color:"#59b38c"}}>Sign in</a>.
    </span>
</div>
<br/>
<br/>
<div class="ml-5">
    <h1 class="display-4" style={{fontFamily: "Abril Fatface" }}>
         No Ads. No problems.
    </h1>
    <span>
    Your privacy stays yours. We don’t sell your data or target you with ads. Ever.
    </span>
</div>

</>
    )
}

function About(){
    return(
        <h2>
            About
        </h2>
    )
}

function Signup(){
    return(
        <div>
            <form method = 'POST'>
                <input type = 'email' value = "email"></input>
            </form>
        </div>
    )
}