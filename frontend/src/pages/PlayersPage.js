import { Component } from "react";
import { Link } from "react-router-dom";
import teamPlayersAPI from "../api/teamPlayerAPI";
import Players from "../components/Players";

class PlayersPage extends Component {
  state = {
    team: null,
  };

  async getTeam() {
    try {
      let teamId = this.props.match.params.teamId;
      let teamData = await teamPlayersAPI.getTeamById(teamId);
      if (teamData) {
        this.setState({ team: teamData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  addPlayer = async () => {
    try {
      let inputFirstName = document.getElementById("new-player-first_name");
      let inputLasName = document.getElementById("new-player-last_name");
      let inputJerseyNumber = document.getElementById(
        "new-player-jersey_number"
      );
      let inputPosition = document.getElementById("new-player-position");
      if (
        inputFirstName &&
        inputLasName &&
        inputJerseyNumber &&
        inputPosition
      ) {
        let newPlayerParams = {
          team: this.state.team.id,
          first_name: inputFirstName.value,
          last_name: inputLasName.value,
          jersey_number: inputJerseyNumber.value,
          position: inputPosition.value,
        };
        let data = await teamPlayersAPI.addPlayer(newPlayerParams);
        if (data) {
          this.getTeam();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getTeam();
  }

  renderPlayers() {
    let playerElements = this.state.team.players.map((player, index) => {
      return (
        <li key={`player-${index}`}>
          <Link to={`/teams/${this.state.team.id}/players/${player.id}`}>
            <Players player={player} />
          </Link>
        </li>
      );
    });
    return (
      <ul className="simple-list" style={{ listStyle: "none" }}>
        {playerElements}
      </ul>
    );
  }

  renderTeam() {
    if (!this.state.team) {
      return <p>No Players Found!</p>;
    }
    return (
      <div>
        <h1>{this.state.team.title} Players</h1>
        {this.renderPlayers()}
        <hr />
        <input id="new-player-first_name" placeholder="new first name" />
        <input id="new-player-last_name" placeholder="new last name" />
        <input id="new-player-jersey_number" placeholder="new jersey number" />
        <input id="new-player-position" placeholder="new position" />
        <button onClick={this.addPlayer}>Add New Player</button>
      </div>
    );
  }

  render() {
    return <div>{this.renderTeam()}</div>;
  }
}

export default PlayersPage;
