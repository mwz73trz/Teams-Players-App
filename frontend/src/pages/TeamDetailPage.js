import { Component } from "react";
import teamPlayerAPI from "../api/teamPlayerAPI";
import TeamDetail from "../components/TeamDetail";

class TeamDetailPage extends Component {
  state = {
    team: null,
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

  componentDidMount() {
    this.getTeam();
  }

  renderTeam() {
    if (!this.state.team) {
      return <p>No Team Found!</p>;
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
      </div>
    );
  }
}

export default TeamDetailPage;
