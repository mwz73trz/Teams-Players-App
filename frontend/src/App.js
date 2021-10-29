import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamDetailPage from "./pages/TeamDetailPage";
import PlayersPage from "./pages/PlayersPage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import AppNav from "./pages/AppNav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNav />
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/teams/:teamId" exact component={TeamDetailPage} />
            <Route
              path="/teams/:teamId/players"
              exact
              component={PlayersPage}
            />
            <Route
              path="/teams/:teamId/players/:playerId"
              exact
              component={PlayerDetailPage}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
