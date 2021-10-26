import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamDetailPage from "./pages/TeamDetailPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/teams/:teamId" exact component={TeamDetailPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
