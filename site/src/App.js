import React from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import axios from 'axios';
import './App.css';

let user;

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
                <Route path = '/welcome' component={Welcome} />
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

<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
<h2 class="display-4" style={{fontFamily: "Abril Fatface"}}>
    Get smarter about what <br /> matters to you.
</h2>
<br />
<h4>Select what you're into. We'll help you find great things to read.</h4>
<br />

<Tiles name = 'Future' />
<Tiles name = 'Technology' />
<Tiles name = 'Physics' />
<Tiles name = 'Health' />
<Tiles name = 'Mathematics' />
<Tiles name = 'Computing' />

<br />

<Tiles name = 'Culture' />
<Tiles name = 'Neuroscience' />
<Tiles name = 'LGBTQ' />

</div>  

<div class="text-center">
    <button style={{backgroundColor: "#55b0c9", border: "none"}} class="btn btn-primary btn-lg" onClick={routeChange}>
        Get Started
    </button>
    <br></br>
    <br></br>
    <span>
        Already have an account. <a href="/signin" style={{color:"#55b0c9"}}>Sign in</a>.
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

function Tiles(props){
    return (
        <button style={{border: "none", borderRadius: "20px",  padding: "3px 5px", margin: "5px"}}>
        <button style={{border: "none", borderRadius: "50%", fontSize: "17px", padding:"2px 10px", color: "white", alignContent:"left", margin: "1px", backgroundColor: "black"}}>
            #
        </button>
        <span style={{fontSize: "20px", margin: "5px"}}>{props.name}</span>    
        </button>
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
    
    const history = useHistory();
    let val = React.createRef();

    const sub = () => {

        axios.post('http://127.0.0.1:4000/signup',{
            email: val.current.value
        }).then((res) => {

            console.log(res);
            user = res.data;
            history.push('/welcome');

        }).catch((error) => {
            console.log(error);
        });
        
        console.log('submited');
        
    }

    return(
        
        <div>
            <br />
            <h2 class="display-4 text-center">
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

function Welcome(){
    
    if(user){
        return(
            <div className="text-center">
                <br />
                <h2>Welcome {user}</h2>
            </div>
        );
    } else {
        return(
       <h2>You need to signin first.</h2>
        );
    }
}

function Signup(){
    return(
        <div>
            <br />
            <h2 class="display-4 text-center">
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