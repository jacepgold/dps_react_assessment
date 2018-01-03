import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Divider, Card, Icon, Image } from 'semantic-ui-react';

class Brewery extends React.Component {
  state = { breweries: [] }

  componentWillMount() {
    axios.get('/api/all_breweries')
      .then(res => {
        let breweries = res.data.entries;
        this.setState({ breweries })
        this.props.dispatch({ type: 'HEADERS', headers: res.headers })
      }).catch(err => {
        console.log(err)
    });
  }

  
  render() {
    let breweries = this.state.breweries;
    return (
      <Segment basic>
        <Segment basic textAlign='center'>
          <Header as='h1' style={styles.whiteText}>Breweries</Header>
        </Segment>
        <Grid>
          <Grid.Column computer={13} tablet={13} mobile={16}>
            <Segment inverted>
              <Header
                as='h1'
                textAlign='center'
                style={styles.whiteText}
              >
                All Breweries
              </Header>
              <Divider />
              <Grid>
                {
                  breweries.map(b =>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                      <Card>
                        <Image src='https://s3.amazonaws.com/brewerydbapi/brewery/YXDiJk/upload_eAMR3T-medium.png' />
                        <Card.Content>
                          <Card.Header>{b.name}</Card.Header>
                          <Card.Meta>Established {b.established}</Card.Meta>
                          <Card.Description style={styles.cardDescription}>{b.description}</Card.Description>
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

export default connect()(Brewery);