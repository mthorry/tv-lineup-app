import React from 'react'
import { connect } from 'react-redux'
import { sortEpisodes } from '../../actions/shows'
import EpisodeItem from './EpisodeItem'
import { Card, Button } from 'semantic-ui-react'

class EpisodeList extends React.Component {

  handleSort = (e) => {
    e.preventDefault()
    let eps = this.props.showEpisodes
    this.props.sortEpisodes(eps)
  }

  render(){
    let episodes = "getting episodes..."
    episodes = this.props.showEpisodes.map( episode => <EpisodeItem key={episode.id} episode={episode} showId={this.props.id} added={this.props.myLineup.filter(myEpisode => myEpisode.id == episode.id)} /> )

    return(
      <div>
        <h2>Episodes</h2>
        <Button onClick={this.handleSort}>Oldest First</Button>
        <Card.Group>
        {episodes}
        </Card.Group>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myLineup: state.show.myLineup,
    showEpisodes: state.show.showEpisodes,
    isFetching: state.show.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortEpisodes: (episodes) => {
      dispatch(sortEpisodes(episodes))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList)