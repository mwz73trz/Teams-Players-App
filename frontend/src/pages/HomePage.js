import { Component } from "react";
import teamPlayerAPI from "../api/teamPlayerAPI";
import Teams from "../components/Teams";

class HomePage extends Component {
  state = {
    teams: [],
  };

  getTeams = async () => {
    try {
      let teamsData = await teamPlayerAPI.getTeams();
      this.setState({ teams: teamsData });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getTeams();
  }

  renderWelcome() {
    let teamElements = this.state.teams.map((team, index) => {
      return (
        <li key={`team-${index}`}>
          <Teams team={team} />
        </li>
      );
    });
    return (
      <div>
        <h2>Welcome to the Team and Player Management App</h2>
        <h2>Teams</h2>
        <ul className="simple-list" style={{ listStyle: "none" }}>
          {teamElements}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {this.renderWelcome()}
      </div>
    );
  }
}

export default HomePage;
