import React from 'react'
import { connect } from 'react-redux'
import { removeShow } from '../../actions/shows'
// import { Link } from 'react-router-dom'

class ShowPage extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.removeShow(this.props.match.params.id)
    this.props.history.push('/shows')
  }

  render() {
    const id = this.props.match.params.id
    const show = (this.props.myShows.filter( show => {return show.id == id}))[0]
    let summary = ""
    // if (show.summary) {summary = show.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}

    if (show === undefined) {return(<p>loading show info...</p>)} else {return(<li id={show.id}>
          <h2>{show.title}</h2>
          <img src={show.img} alt={show.title} width="250"/>
          { show.status === "Running" ? <p>Airs {show.air_day}s at {show.air_time} on {show.network}</p> : <p><strong>{show.status}</strong></p> }
          <p>Summary: {summary}</p>
          <p>Genre: {show.genre}</p>
          <p>Rating: {show.rating}</p>
          { show.url ? <a href={show.url} target="_blank">| Official Website |</a> : null }
          <button onClick={this.handleClick}>Remove from my shows</button>
        <p> </p>
        </li>)}

  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeShow: (id) => {
      dispatch(removeShow(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)

// import React from 'react'
// import { Link } from 'react-router-dom'

// class ShowPage extends React.Component {
//   render(){
//     const name = this.props.match.params.name
//     return(
//       <div>
//       <p>ShowPage {name}</p>
//       </div>
//     )
//   }
// }

// export default ShowPage

// "How To Get Away With Murder".toLowerCase().split(" ").join("-")
// https://api.trakt.tv/shows/how-to-get-away-with-murder?extended=full