import { Component } from "react";
import { Link } from "react-router-dom";

class Teams extends Component {
  render() {
    return (
      <span>
        <Link to={`/teams/${this.props.team.id}`}>{this.props.team.title}</Link>
        {"     "}
        <button onClick={() => this.props.handleDelete(this.props.team.id)}>
          Delete
        </button>
      </span>
    );
  }
}

export default Teams;
