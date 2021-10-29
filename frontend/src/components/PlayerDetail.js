import { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

class PlayerDetail extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h1">
              Name: {this.props.player.first_name} {this.props.player.last_name}
            </CardTitle>
            <CardText>
              Jersey Number: {this.props.player.jersey_number}
            </CardText>
            <CardText>Position: {this.props.player.position}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default PlayerDetail;
