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

  addTeam = async () => {
    let inputTitle = document.getElementById("new-team-title");
    let inputStadium = document.getElementById("new-team-stadium");
    let inputCity = document.getElementById("new-team-city");
    let inputState = document.getElementById("new-team-state");
    let inputYearEstablished = document.getElementById("new-team-date");

    if (
      inputTitle &&
      inputStadium &&
      inputCity &&
      inputState &&
      inputYearEstablished
    ) {
      let newTeamParams = {
        title: inputTitle.value,
        stadium: inputStadium.value,
        city: inputCity.value,
        state: inputState.value,
        year_established: inputYearEstablished.value,
      };
      let data = await teamPlayerAPI.addTeam(newTeamParams);
      if (data) {
        let newTeams = [...this.state.teams, data];
        this.setState({ teams: newTeams });
      }
    }
  };

  deleteTeam = async (teamId) => {
    try {
      if (teamId > 0) {
        let result = await teamPlayerAPI.deleteTeam(teamId);
        if (result.success) {
          let newTeams = this.state.teams.filter((team, index) => {
            return team.id !== teamId;
          });
          this.setState({ teams: newTeams });
        }
      }
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
          <Teams team={team} handleDelete={this.deleteTeam} />
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
        <hr />
        <input id="new-team-title" placeholder="new team title" />
        <input id="new-team-stadium" placeholder="new stadium" />
        <input id="new-team-city" placeholder="new city" />
        <input id="new-team-state" placeholder="new state" />
        <input id="new-team-date" placeholder="new year established" />
        <button onClick={this.addTeam}>Create New Team</button>
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
