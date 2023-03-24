import React, { useCallback, useContext } from "react";
import { useState } from "react";
import { LoggedInContext } from "./App";

function LoginPage(){
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext)
    
    return(
        <div className="LoginPageDiv">
            <h1>Login</h1>
            <br />
            <br />
            <input type="text" id="username" placeholder="Username"/>
            <input type="password" id="password" placeholder="Password"/>
            <br />
            <button onClick={() => Login(setLoggedIn)}>Login</button>
        </div>
    )
    
}

function Login(setLoggedIn) {
    let usernameInput = document.querySelector("#username");
    let passwordInput = document.querySelector("#password");

    fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"username": usernameInput.value, "password": passwordInput.value})
    }
    ).then(response => {
        if (response.status == 204 && response.ok == true){
            setLoggedIn(true);
            return;
        }

        response.json()
    }).then(response => {
        console.log(response)
    })
}

export default LoginPage