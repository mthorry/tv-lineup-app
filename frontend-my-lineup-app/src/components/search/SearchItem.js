import { connect } from 'react-redux'
import { addShow, clearResults } from '../../actions/search'
import React from 'react'

class SearchItem extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.addShow(this.props.show.show)
    this.props.clearResults()
    this.props.history.push('/shows')
  }

  render(){
    const s = this.props.show.show
    let summary = ""
    if (s.summary) { summary = s.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}

    return(
      <li key={s.id}>
        <h3>{s.name}</h3>
        { s.image ? <img src={s.image.medium} alt={s.name} /> : null }
        { s.webChannel ? <p>Watch on {s.webChannel.name}</p> : null }
        { s.status === "Running" ? <p>Airs {s.schedule.days[0]}s at {s.schedule.time} on {s.network.name}</p> : <p><strong>{s.status}</strong></p>}
        <p>Summary: {summary}</p>
        <p>Genre: {s.genres.join(", ")}</p>
        <button onClick={this.handleClick}>Add to My Shows</button>
        <br/>
      </li>
    )}
}

function mapDispatchToProps(dispatch) {
  return {
    addShow: (show) => {
      dispatch(addShow(show))
    },
    clearResults: () => {
      dispatch(clearResults())
    }
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)