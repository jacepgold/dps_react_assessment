import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Divider, Card, Image, Icon } from 'semantic-ui-react';

class Beers extends React.Component {
  state = { beers: [], breweries: [] }
  
  componentDidMount() {
    axios.get('/api/all_beers')
    .then(res => {
      console.log("All Beers Success = " + res)
      let beers = res.data.entries;
      this.setState({ beers })
      this.props.dispatch({ type: 'HEADERS', headers: res.headers })
    }).catch(err => {
      console.log("All Beers Error = " + err)
    })
    
    axios.get('/api/all_breweries')
    .then(res => {
      console.log("All Breweries Success = " + res)
      let breweries = res.data.entries;
      this.setState({ breweries })
      this.props.dispatch({ type: 'HEADERS', headers: res.headers })
    }).catch(err => {
      console.log("All Breweries Error = " + err)
    });
  }
    
  render() {
    let beers = this.state.beers;
    let breweries = this.state.breweries;
    
    return(
      <Segment basic>
        <Header as="h1" textAlign='center' style={styles.whiteText}>
          Beers &amp; Breweries
        </Header>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment>

              <Grid.Column computer={8} tablet={8} mobile={16}>
                <Segment inverted>
                  <Header
                    as='h2'
                    textAlign='center'
                    style={styles.whiteText}>
                    All Breweries
                    </Header>
                  <Divider />
                  <Grid centered>
                    {
                      breweries.map(b =>
                        <Grid.Column computer={5} tablet={8} mobile={16}>
                          <Card>
                            <Image src="https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg" />
                            <Card.Content>
                              <Card.Header>{b.name}</Card.Header>
                              <Card.Meta>Brewery</Card.Meta>
                              <Card.Description style={styles.cardDescription}>
                                { b.description }
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='linkify' />
                                <a href={b.website}>{b.website}</a>
                              </a>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                      )
                    }
                  </Grid>
                </Segment>
              </Grid.Column>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              
              <Grid.Column computer={5} tablet={8} mobile={16}>
              <Segment inverted>
                <Header
                  as='h2'
                  textAlign='center'
                  style={styles.whiteText}
                >
                  All Beers
                  </Header>
                <Divider />
                  <Grid centered>
                    {
                      beers.map(b =>
                        <Grid.Column computer={5} tablet={8} mobile={16}>
                          <Card>
                            <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                            <Card.Content>
                              <Card.Header>{b.name}</Card.Header>
                              <Card.Meta>Beer</Card.Meta>
                              <Card.Description style={styles.cardDescription}>
                                {b.description}
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='user' />
                                {b.website}
                              </a>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                      )
                    }
                  </Grid>
              </Segment>
            </Grid.Column>

            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}


const styles = {
  centered: {
    margin: '0 auto',
  },
  cardDescription: {
    height: '210px',
    overflow: 'hidden',
  },
  item: {
    margin: '10px 0',
  },
  whiteText: {
    color: 'white',
  },
}

export default connect()(Beers);