import { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

class TeamDetail extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h1">Team: {this.props.team.title}</CardTitle>
            <CardText>Stadium: {this.props.team.stadium}</CardText>
            <CardText>city: {this.props.team.city}</CardText>
            <CardText>State: {this.props.team.state}</CardText>
            <CardText>
              Year Established: {this.props.team.year_established}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TeamDetail;
