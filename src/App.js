import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
    return (
        <div className="App h-100">
            <Router>
                <Route exact path="/" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signUp" component={SignUp} />
            </Router>
        </div>
    );
}

export default App;
