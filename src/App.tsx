import React from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from 'react-router-dom'
import Game from "./components/Game";
import Home from "./components/Home";
import Instruction from "./components/Instruction";
import Ranks from "./components/Ranks";


const App: React.FC = () => {

  return (
    <div className="container">
      <Link className="quit-g" to="/">
        Exit
      </Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/rank" component={Ranks} />
        <Route exact path="/ins" component={Instruction} />
      </Switch>
    </div>
  );
};

export default App;
