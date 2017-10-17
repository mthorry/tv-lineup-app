import React from 'react'
import { connect } from 'react-redux'
import { removeShow } from '../../actions/shows'
import { Link } from 'react-router-dom'

class ShowItem extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.removeShow(this.props.show.id)
  }

  render() {
    const s = this.props.show
    const title = s.title.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(" ").join("-").replace("--", "-")
    let summary = ""
    if (s.summary) {summary = s.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}
    return(
        <li id={s.id}>
          <h3>{s.title}</h3>
          <img src={s.img} alt={s.title} width="250"/>
          { s.status === "Running" ? <p>Airs {s.air_day}s at {s.air_time} on {s.network}</p> : <p><strong>{s.status}</strong></p> }
          <p>Summary: {summary}</p>
          <p>Genre: {s.genre}</p>
          <p>Rating: {s.rating}</p>
          <a href={s.url} target="_blank">| Official Website |</a>
          <Link to={`/shows/${s.id}/${title}`}>| Show Info |</Link>
          <button onClick={this.handleClick}>Remove from my shows</button>
          <p></p>
        </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeShow: (id) => {
      dispatch(removeShow(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(ShowItem)
