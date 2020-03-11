import React from 'react';
import { 
  Container, Row, Col, Card, Input,
  CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button 
} from 'reactstrap';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    searchText: '',
    followers: []
  };

  componentDidMount() {

    axios
    .get('https://api.github.com/users/eddiemadrigal')
    .then(res => {
      this.setState({
        users: res.data
      });
    })
    .catch(err => console.log(err));

    axios
        .get(`https://api.github.com/users/eddiemadrigal/followers`)
        .then(res => {
          this.setState({
            followers: res.data
          });
        })
        .catch(err => console.log(err));

  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevState.users.id !== this.state.users.id ) {

      axios
      .get(`https://api.github.com/users/${this.state.searchText}`)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err.message));

      axios
      .get(`https://api.github.com/users/${this.state.searchText}/followers`)
      .then(res => {
        this.setState({
          followers: res.data
        });
      })
      .catch(err => console.log(err));
      
    }

    console.log("prevState user:", prevState.users);
    console.log("this state users", this.state.users);

  }

  handleChanges = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  fetchUsers = e => {

    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.searchText}`)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err));

      axios
      .get(`https://api.github.com/users/${this.state.searchText}/followers`)
      .then(res => {
        this.setState({
          followers: res.data
        });
      })
      .catch(err => console.log(err));

  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1>GitHub User Search</h1>
                <Row form>
                  <Col md={{ size: 9 }}>
                    <Input placeholder="GitHub User Name" value = { this.state.searchText }  onChange = { this.handleChanges } />
                  </Col>
                  <Col md={{ size: 3 }}>
                    <Button color="success" onClick = { this.fetchUsers }>Search</Button>
                  </Col>
                </Row>
              <Card className="card-info">
                <CardImg top width="100%" src={ this.state.users.avatar_url } alt="GitHub profile pic" />
                <CardBody>
                  <CardTitle><h2>{ this.state.users.name }</h2></CardTitle>
                  <CardSubtitle><b>Login: { this.state.users.login }</b></CardSubtitle>
                  <CardText className="bio-info"><b>Bio:</b> { this.state.users.bio }</CardText>
                  <CardText className="bio-info"><b>Followers:</b> { this.state.users.followers }</CardText> 
                  <CardText className="bio-info"><b>Following:</b> { this.state.users.following }</CardText>
                  <Button href={ this.state.users.html_url } target="_blank" color="primary">Learn More</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h2>Followers</h2>
              
                {this.state.followers.map( follower => (

                  <Card className="card-info" key={ follower.id }>
                    <CardImg top width="100%" src={ follower.avatar_url } alt="GitHub profile pic" />
                    <CardBody>
                      <CardTitle><h2>{ follower.name }</h2></CardTitle>
                      <CardSubtitle><b>GitHub User ID: { follower.login }</b></CardSubtitle><br />
                      <Button href={ follower.html_url } target="_blank" color="primary">Learn More</Button>
                    </CardBody>
                  </Card>

                ))}
              
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default App;
