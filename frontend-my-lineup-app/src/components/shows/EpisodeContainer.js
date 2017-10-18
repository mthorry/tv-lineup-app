import React from 'react'
import { connect } from 'react-redux'
import { fetchShowEpisodes, sortEpisodes } from '../../actions/shows'
import EpisodeList from './EpisodeList'

class EpisodeContainer extends React.Component {

  componentDidMount() {
    this.props.fetchShowEpisodes(this.props.match.params.id)
  }


  render(){
    const name = this.props.match.params.name
    const id = this.props.match.params.id
    return(
      <div>
        <EpisodeList show={name} id={id} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    myLineup: state.show.myLineup,
    showEpisodes: state.show.showEpisodes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShowEpisodes: (id) => {
      dispatch(fetchShowEpisodes(id))
    },
    sortEpisodes: (episodes) => {
      dispatch(sortEpisodes(episodes))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeContainer)

// EPISODES LIST:
  // http://api.tvmaze.com/shows/{id}/episodes?extended=full

// EPISODE SHOW PAGE:
  // "Show Name".toLowerCase().split(" ").join("-")
  // https://api.trakt.tv/shows/{show-name}/seasons/{season}/episodes/{episode}