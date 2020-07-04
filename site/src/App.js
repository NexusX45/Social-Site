import React from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import axios from 'axios';

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
                <Route path = '/signin'>
                    <Signin />
                </Route>
                <Route path = '/signup'>
                    <Signup />
                </Route>
            </Switch>
        </Router>
    )
}

function Home(){

    const history = useHistory();

    const routeChange = () =>{
        let path = '/signup';
        history.push(path);
    }

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"><h2 style={{fontFamily: "Lobster", fontSize: '4rem'}}>Clairvoyance</h2></a>
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
    <a style={{backgroundColor: "#59b38c", border: "none"}}  class="btn btn-primary btn-md" href="/signup">Get Started</a>
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
    <button style={{backgroundColor: "#59b38c", border: "none"}} class="btn btn-primary btn-lg" onClick={routeChange}>
        Get Started
    </button>
    <br></br>
    <br></br>
    <span>
        Already have an account. <a href="/signin" style={{color:"#59b38c"}}>Sign in</a>.
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

function Signin(){

    let val = React.createRef();

    const sub = () => {

        axios.post('http://127.0.0.1:4000/signup',{
            email: val.current.value
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
        
        console.log('submited');
    }

    return(
        <div>
            <h2 class="text-center">
                Sign In
            </h2>
            <br />
            <div class = "text-center">
                <form method = 'POST'>
                    <span class = "text-dark" style = {{padding: '14px'}}>Email:</span>
                    <input type = 'email' ref = {val}></input>
                    <br />
                    <span class = "text-dark">Password:</span>
                    <input type = 'password'></input>
                    <br />
                    <br />
                </form>
                <button onClick = {sub}>Submit</button>
            </div>
        </div>
    )
}

function Signup(){
    return(
        <div>
            <h2 class="text-center">
                Sign Up
            </h2>
            <br />
            <div class = "text-center">
                <form method = 'POST'>
                    <span class = "text-dark" style = {{padding: '14px'}}>Email:</span>
                    <input type = 'email' name = 'email'></input>
                    <br />
                    <span class = "text-dark">Password:</span>
                    <input type = 'password'></input>
                    <br />
                    <br />
                    <input type = 'button' value = "submit"></input>
                </form>
            </div>
        </div>
    )
}