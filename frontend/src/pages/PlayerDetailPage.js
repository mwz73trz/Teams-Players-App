import { Component } from "react";
import teamPlayerAPI from "../api/teamPlayerAPI";
import PlayerDetail from "../components/PlayerDetail";

class PlayerDetailPage extends Component {
  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  };

  state = {
    player: null,
    mode: PlayerDetailPage.MODE_TYPE.VIEW,
  };

  async getPlayer() {
    try {
      let playerId = this.props.match.params.playerId;
      let playerData = await teamPlayerAPI.getPlayerById(playerId);
      if (playerData) {
        this.setState({ player: playerData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  updatePlayer = async () => {
    try {
      let inputFirstName = document.getElementById("player-first_name");
      let inputLasName = document.getElementById("player-last_name");
      let inputJerseyNumber = document.getElementById("player-jersey_number");
      let inputPosition = document.getElementById("player-position");

      let playerId = this.state.player.id;
      if (
        inputFirstName &&
        inputLasName &&
        inputJerseyNumber &&
        inputPosition &&
        playerId
      ) {
        let updatedPlayer = {
          team: this.state.player.team,
          first_name: inputFirstName.value,
          last_name: inputLasName.value,
          jersey_number: inputJerseyNumber.value,
          position: inputPosition.value,
        };
        let data = await teamPlayerAPI.updatePlayer(playerId, updatedPlayer);
        if (data) {
          this.setState({ player: data });
          this.changeMode(PlayerDetailPage.MODE_TYPE.VIEW);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deletePlayer = async () => {
    try {
      let teamId = this.state.player.team;
      let playerId = this.state.player.id;
      if (playerId > 0) {
        let result = await teamPlayerAPI.deletePlayer(playerId);
        if (result.success) {
          this.props.history.push(`/teams/${teamId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getPlayer();
  }

  renderPlayer() {
    if (!this.state.player) {
      return <p>No Player Found!</p>;
    }
    if (this.state.mode === PlayerDetailPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">First Name: </h1>
            <input
              id="player-first_name"
              placeholder="first name"
              defaultValue={this.state.player.first_name}
            />
          </div>
          <div>
            <h1 className="nonbreak">Last Name: </h1>
            <input
              id="player-last_name"
              placeholder="last name"
              defaultValue={this.state.player.last_name}
            />
          </div>
          <div>
            <h1 className="nonbreak">Jersey Number: </h1>
            <input
              id="player-jersey_number"
              placeholder="jersey number"
              defaultValue={this.state.player.jersey_number}
            />
          </div>
          <div>
            <h1 className="nonbreak">Position: </h1>
            <input
              id="player-position"
              placeholder="position"
              defaultValue={this.state.player.position}
            />
          </div>
          <hr />
          <button onClick={this.updatePlayer}>Save</button>
          <button
            onClick={() => this.changeMode(PlayerDetailPage.MODE_TYPE.VIEW)}
          >
            Cancel
          </button>
        </div>
      );
    }
    return <PlayerDetail player={this.state.player} />;
  }

  render() {
    return (
      <div>
        <h1>Player Detail Page</h1>
        {this.renderPlayer()}
        <hr />
        <button
          onClick={() => this.changeMode(PlayerDetailPage.MODE_TYPE.UPDATE)}
        >
          Update
        </button>
        <button onClick={this.deletePlayer}>Delete</button>
      </div>
    );
  }
}

export default PlayerDetailPage;
