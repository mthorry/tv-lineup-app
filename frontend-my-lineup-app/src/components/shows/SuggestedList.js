import React from 'react'
import { connect } from 'react-redux'
import { sortEpisodes, addSuggestedShow } from '../../actions/shows'
import { Card, Button } from 'semantic-ui-react'

class SuggestedList extends React.Component {

  state = {
    recommended: []
  }

  handleClick = (e) => {
    this.props.addSuggestedShow(e.target.id)
  }

  componentDidMount = () => {
    let body = JSON.stringify(this.props.show)
    return fetch("http://localhost:3000/recommend", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            'body': body
        })
          .then(res => {
            if (res.ok) { res.json()
              .then(json => this.setState({
                recommend: json
              }))}
            })
          .catch(error => (console.error("there was a problem:", error)))
  }
  render(){
    let titles = this.props.myShows.map(show => show.title)
    let recs = "getting suggestions..."
    if (this.state.recommend) { recs = this.state.recommend.map( show => titles.includes(show.title) ? null : <Card key={show.ids.tvdb} >
      <Card.Content>
        <h3>{show.title}</h3>
        { show.airs.day ? <h5>Airs: {show.airs.day} at {show.airs.time}</h5> : <h5>{show.status}</h5> }
        <Card.Description>Summary: {show.overview.substring(0,250)} ... </Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Meta>Genres: {show.genres.join(", ")}</Card.Meta>
        <Card.Meta>Status: {show.status}</Card.Meta>
        <Card.Meta>Network: {show.network}</Card.Meta>
        <Card.Meta>Rating: {Math.round(show.rating)}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
        <Button basic color='teal' as='a' href={show.homepage} target="_blank" content='Website' icon='external'/>
        <Button basic color='olive' onClick={this.handleClick} id={show.ids.tvdb} content='Add Show' icon='add'/>
      </div>
      </Card.Content>
      </Card>)
     } else { recs = <p>Sorry, no recommendations here 😭</p> }

    return(
      <div>
        <p></p>
        <Card.Group>
          {recs}
        </Card.Group>
      </div>
    )
  }
}
        // <SuggestedShowPage />

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortEpisodes: (episodes) => {
      dispatch(sortEpisodes(episodes))
    },
    addSuggestedShow: (id) => {
      dispatch(addSuggestedShow(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedList)