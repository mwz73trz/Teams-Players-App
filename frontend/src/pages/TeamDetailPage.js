import { Component } from "react";
import { Link } from "react-router-dom";
import teamPlayerAPI from "../api/teamPlayerAPI";
import TeamDetail from "../components/TeamDetail";

class TeamDetailPage extends Component {
  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  };

  state = {
    team: null,
    mode: TeamDetailPage.MODE_TYPE.VIEW,
  };

  async getTeam() {
    try {
      let teamId = this.props.match.params.teamId;
      let teamData = await teamPlayerAPI.getTeamById(teamId);
      if (teamData) {
        this.setState({ team: teamData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeMode = async (newMode) => {
    this.setState({ mode: newMode });
  };

  updateTeam = async () => {
    try {
      let inputTitle = document.getElementById("team-title");
      let inputStadium = document.getElementById("team-stadium");
      let inputCity = document.getElementById("team-city");
      let inputState = document.getElementById("team-state");
      let inputYearEstablised = document.getElementById("team-date");

      let teamId = this.state.team.id;
      if (
        inputTitle &&
        inputStadium &&
        inputCity &&
        inputState &&
        inputYearEstablised &&
        teamId > 0
      ) {
        let updatedTeam = {
          title: inputTitle.value,
          stadium: inputStadium.value,
          city: inputCity.value,
          state: inputState.value,
          year_established: inputYearEstablised.value,
        };
        let data = await teamPlayerAPI.updateTeam(teamId, updatedTeam);
        if (data) {
          this.setState({ team: data });
          this.changeMode(TeamDetailPage.MODE_TYPE.VIEW);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getTeam();
  }

  renderTeam() {
    if (!this.state.team) {
      return <p>No Team Found!</p>;
    }
    if (this.state.mode === TeamDetailPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">Team Title: </h1>
            <input
              id="team-title"
              placeholder="title"
              defaultValue={this.state.team.title}
            />
          </div>
          <div>
            <h1 className="nonbreak">Stadium: </h1>
            <input
              id="team-stadium"
              placeholder="stadium"
              defaultValue={this.state.team.stadium}
            />
          </div>
          <div>
            <h1 className="nonbreak">City: </h1>
            <input
              id="team-city"
              placeholder="city"
              defaultValue={this.state.team.city}
            />
          </div>
          <div>
            <h1 className="nonbreak">State: </h1>
            <input
              id="team-state"
              placeholder="state"
              defaultValue={this.state.team.state}
            />
          </div>
          <div>
            <h1 className="nonbreak">Year Established: </h1>
            <input
              id="team-date"
              placeholder="date"
              defaultValue={this.state.team.year_established}
            />
            <br />
            <br />
            <button onClick={this.updateTeam}>Save</button>
            <button
              onClick={() => this.changeMode(TeamDetailPage.MODE_TYPE.VIEW)}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <TeamDetail team={this.state.team} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Team Detail Page</h1>
        {this.renderTeam()}
        <hr />
        <button
          onClick={() => this.changeMode(TeamDetailPage.MODE_TYPE.UPDATE)}
        >
          Update
        </button>
        <br />
        <Link to={`/teams/${this.state.team.id}/players`}>
          Favorite Players on this Team
        </Link>
      </div>
    );
  }
}

export default TeamDetailPage;
