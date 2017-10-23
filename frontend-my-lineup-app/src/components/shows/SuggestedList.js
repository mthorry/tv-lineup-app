import React from 'react'
import { connect } from 'react-redux'
import { formatTime } from '../../services/formatting'
import { addSuggestedShow } from '../../actions/shows'
import { Card, Button, Loader } from 'semantic-ui-react'

// EPISODE CONTAINER = PARENT

class SuggestedList extends React.Component {

  state = {
    recommended: []
  }

  handleClick = (e) => {
    this.props.addSuggestedShow(e.target.id)
  }

  componentDidMount = () => {
    let token = localStorage.getItem("jwtToken")
    let body = JSON.stringify(this.props.show)
    return fetch("http://localhost:3000/recommend", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      'body': body
        })
      .then(res => res.json())
          .then(json =>
            this.setState({
              recommend: json
            })
          ).catch(error => (console.error("there was a problem:", error)))
  }

  render(){
    let titles = this.props.myShows.map(show => show.title)
    let recs = ""

    if (this.state.recommend) { recs = this.state.recommend.map( show => titles.includes(show.title) ? null : <Card key={show.ids.tvdb} >
      <Card.Content>
        <h3>{show.title}</h3>
        { show.status !== 'ended' ? <h5>Airs: {show.airs.day} {formatTime(show.airs.time)} on {show.network}</h5> : <h5>{(show.status).toUpperCase()}</h5> }
        <Card.Description>Summary: {show.overview ? show.overview.substring(0,250) + `...` : `Not Available`} </Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Meta>Genres: {show.genres.join(", ")}</Card.Meta>
        <Card.Meta>Rating: {(show.rating).toString().slice(0,3)}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
        <Button basic color='teal' as='a' href={show.homepage} target="_blank" content='Website' icon='external'/>
        <Button basic color='olive' onClick={this.handleClick} id={show.ids.tvdb} content='Add Show' icon='add'/>
      </div>
      </Card.Content>
      </Card>)
     }

    return(
      <div>
        <p></p>
        <Card.Group>
          {recs.length > 0 ? recs : <Loader active inline='centered' size='large'/>}
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
    addSuggestedShow: (id) => {
      dispatch(addSuggestedShow(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedList)