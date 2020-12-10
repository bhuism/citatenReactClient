import React from 'react';
import 'primereact/resources/themes/mdc-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";

export function getRuntimeVariable(setting: string): string {
    const win = window as any;
    return win["_env_"][setting];
}

const App: React.FC = () => {
    return (
        <Router>
            <Route exact={true} path="/" component={HomePage}/>
        </Router>
    );
}


export default App;
