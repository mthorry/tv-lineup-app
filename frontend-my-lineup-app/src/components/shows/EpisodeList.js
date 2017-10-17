import React from 'react'
import { connect } from 'react-redux'
import { sortEpisodes } from '../../actions/shows'
import EpisodeItem from './EpisodeItem'

class EpisodeList extends React.Component {

  handleSort = (e) => {
    e.preventDefault()
    let eps = this.props.showEpisodes
    this.props.sortEpisodes(eps)
  }

  render(){
    let episodes = "getting episodes..."
    episodes = this.props.showEpisodes.map(episode => <EpisodeItem key={episode.id} episode={episode} showId={this.props.id} watched={this.props.myEpisodes.filter(myEpisode => myEpisode.id == episode.id)} /> )

    return(
      <ul>
        <h3>Episodes</h3>
        <button onClick={this.handleSort}>Oldest First</button>
        {episodes}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    myEpisodes: state.show.myEpisodes,
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