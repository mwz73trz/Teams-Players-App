import { Component } from "react";
import teamPlayerAPI from "../api/teamPlayerAPI";
import PlayerDetail from "../components/PlayerDetail";

class PlayerDetailPage extends Component {
  state = {
    player: null,
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
    return <PlayerDetail player={this.state.player} />;
  }

  render() {
    return (
      <div>
        <h1>Player Detail Page</h1>
        {this.renderPlayer()}
        <button onClick={this.deletePlayer}>Delete</button>
      </div>
    );
  }
}

export default PlayerDetailPage;
