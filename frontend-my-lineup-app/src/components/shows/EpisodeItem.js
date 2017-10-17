import React from 'react'
import { connect } from 'react-redux'
import { addEpisode, removeEpisode, fetchMyEpisodes } from '../../actions/shows'

class EpisodeItem extends React.Component {

  markWatched = (e) => {
    e.preventDefault()
    const episode = JSON.stringify({show: this.props.episode,
      show_id: this.props.showId})
    this.props.addEpisode(episode)
    }

  markUnwatched = (e) => {
    e.preventDefault()
    const id = JSON.stringify({id: this.props.episode.id})
    this.props.removeEpisode(id)
    }

  render(){
    const ep = this.props.episode
    let summary = ""
    if (ep.summary) {summary = ep.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}
    return(
      <li>
       { ep.image ? <img src={ep.image.original} alt={ep.name} width="200"/> : null }
        <h3>{ep.name}</h3>
        <p>Season {ep.season}: Episode {ep.number}</p>
        <p>Aired: {ep.airdate}</p>
        <p>{summary}</p>
        <a href={ep.url} target="_blank">More Info</a>
        { this.props.watched.length ? <button onClick={this.markUnwatched}>Mark as Unwatched</button> : <button onClick={this.markWatched}>Mark as Watched</button> }
        <p></p>
        <br/>
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addEpisode: (episode) => {
      dispatch(addEpisode(episode))
    },
    fetchMyEpisodes: (id) => {
      dispatch(fetchMyEpisodes(id))
    },
    removeEpisode: (id) => {
      dispatch(removeEpisode(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myEpisodes: state.show.myEpisodes,
    isFetching: state.show.isFetching
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EpisodeItem)

