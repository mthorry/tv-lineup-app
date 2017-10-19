import React from 'react'
import { connect } from 'react-redux'
import { addEpisode, removeEpisode, fetchMyLineup } from '../../actions/shows'
import { Card, Button, Image } from 'semantic-ui-react'

class EpisodeItem extends React.Component {

  addEpisode = (e) => {
    e.preventDefault()
    const episode = JSON.stringify({show: this.props.episode,
      show_id: this.props.showId})
    this.props.addEpisode(episode)
    }

  removeEpisode = (e) => {
    e.preventDefault()
    const id = JSON.stringify({id: this.props.episode.id})
    this.props.removeEpisode(id)
    }

  render(){
    const ep = this.props.episode
    let summary = ""
    if (ep.summary) {summary = ep.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}
    return(
      <Card>
        <Card.Content>
          { ep.image ? <Image src={ep.image.original} alt={ep.name}/> : null }
          <Card.Header as='h3'>{ep.name}</Card.Header>
          <Card.Description>Season {ep.season}: Episode {ep.number}</Card.Description>
          <Card.Description>Airs {ep.airdate} at {ep.airtime}</Card.Description>
          <Card.Description>{summary}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
          <Button basic color='teal' as='a' href={ep.url} target='_blank'>More Info</Button>
          { this.props.added.length ? <Button basic color='yellow' onClick={this.removeEpisode} >Remove</Button> : <Button basic color='olive' onClick={this.addEpisode}>Add to Lineup</Button> }
          </div>
        </Card.Content>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addEpisode: (episode) => {
      dispatch(addEpisode(episode))
    },
    fetchMyLineup: (id) => {
      dispatch(fetchMyLineup(id))
    },
    removeEpisode: (id) => {
      dispatch(removeEpisode(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myLineup: state.show.myLineup,
    isFetching: state.show.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeItem)

